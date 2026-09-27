import { useEffect, useRef } from 'react'

// A simulated navigation estimator, not flight data. The drone flies a smooth track; the
// estimate drifts from it as visual-inertial odometry does without GNSS, and a periodic
// terrain-relative fix pulls the estimate back and collapses the uncertainty.

const FIX_INTERVAL_S = 4.5
const TRACK_RADIUS_FRAC = 0.22
const LANDMARK_DENSITY = 1 / 2600 // landmarks per px²
const TRAIL_MAX = 700

type Point = { x: number; y: number }

function cssVar(el: Element, name: string): string {
  const value = getComputedStyle(el).getPropertyValue(name).trim()
  if (!value) throw new Error(`NavViz: CSS custom property ${name} is not defined`)
  return value
}

export default function NavViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const driftRef = useRef<HTMLSpanElement>(null)
  const featRef = useRef<HTMLSpanElement>(null)
  const fixRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) throw new Error('NavViz: canvas ref not attached')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('NavViz: 2D canvas context unavailable')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let colors = readColors()
    let w = 0
    let h = 0
    let landmarks: Point[] = []
    let truth: Point[] = []
    let estimate: Point[] = []
    let drift: Point = { x: 0, y: 0 }
    let driftVel: Point = { x: 0, y: 0 }
    let bias = randomBias()
    let sinceFix = 0
    let fixPulse = 0
    let t = 0
    let raf = 0
    let last = performance.now()
    let hudTimer = 0

    function randomBias(): Point {
      const angle = Math.random() * Math.PI * 2
      const speed = 7 + Math.random() * 5 // px/s
      return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }
    }

    function readColors() {
      return {
        grid: cssVar(canvas!, '--viz-grid'),
        landmark: cssVar(canvas!, '--viz-landmark'),
        tracked: cssVar(canvas!, '--viz-tracked'),
        truth: cssVar(canvas!, '--viz-truth'),
        estimate: cssVar(canvas!, '--accent'),
        fix: cssVar(canvas!, '--viz-fix'),
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(w * h * LANDMARK_DENSITY)
      landmarks = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h }))
      truth = []
      estimate = []
    }

    function trackAt(time: number): Point {
      const r = Math.min(w, h) * TRACK_RADIUS_FRAC
      return {
        x: w * 0.5 + r * 1.9 * Math.sin(time * 0.16),
        y: h * 0.52 + r * Math.sin(time * 0.27 + 1.1),
      }
    }

    function step(dt: number) {
      t += dt
      sinceFix += dt
      fixPulse = Math.max(0, fixPulse - dt * 1.4)

      // Drift = a systematic bias (like uncorrected heading error) plus a damped random walk.
      // It grows without bound until an absolute fix arrives.
      driftVel.x = driftVel.x * 0.98 + (Math.random() - 0.5) * 40 * dt
      driftVel.y = driftVel.y * 0.98 + (Math.random() - 0.5) * 40 * dt
      drift.x += (bias.x + driftVel.x * 10) * dt
      drift.y += (bias.y + driftVel.y * 10) * dt

      if (sinceFix >= FIX_INTERVAL_S) {
        drift = { x: drift.x * 0.08, y: drift.y * 0.08 }
        driftVel = { x: 0, y: 0 }
        bias = randomBias()
        sinceFix = 0
        fixPulse = 1
      }

      const p = trackAt(t)
      truth.push(p)
      estimate.push({ x: p.x + drift.x, y: p.y + drift.y })
      if (truth.length > TRAIL_MAX) {
        truth.shift()
        estimate.shift()
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      ctx!.strokeStyle = colors.grid
      ctx!.lineWidth = 1
      ctx!.beginPath()
      for (let x = 0.5; x < w; x += 48) {
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
      }
      for (let y = 0.5; y < h; y += 48) {
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
      }
      ctx!.stroke()

      const est = estimate[estimate.length - 1]
      if (!est) return
      const sensorRange = Math.min(w, h) * 0.26

      let tracked = 0
      for (const lm of landmarks) {
        const dx = lm.x - est.x
        const dy = lm.y - est.y
        const inRange = dx * dx + dy * dy < sensorRange * sensorRange
        if (inRange) {
          tracked++
          ctx!.strokeStyle = colors.tracked
          ctx!.globalAlpha = 0.18
          ctx!.beginPath()
          ctx!.moveTo(est.x, est.y)
          ctx!.lineTo(lm.x, lm.y)
          ctx!.stroke()
          ctx!.globalAlpha = 1
          ctx!.strokeRect(lm.x - 2.5, lm.y - 2.5, 5, 5)
        } else {
          ctx!.fillStyle = colors.landmark
          ctx!.fillRect(lm.x - 1, lm.y - 1, 2, 2)
        }
      }

      ctx!.setLineDash([3, 5])
      ctx!.strokeStyle = colors.truth
      ctx!.lineWidth = 1.2
      tracePath(truth)
      ctx!.setLineDash([])

      ctx!.strokeStyle = colors.estimate
      ctx!.lineWidth = 2
      tracePath(estimate)

      const sigma = 8 + sinceFix * 7
      ctx!.strokeStyle = colors.estimate
      ctx!.globalAlpha = 0.5
      ctx!.lineWidth = 1
      ctx!.beginPath()
      ctx!.ellipse(est.x, est.y, sigma * 1.3, sigma, 0.4, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.globalAlpha = 1

      if (fixPulse > 0) {
        ctx!.strokeStyle = colors.fix
        ctx!.globalAlpha = fixPulse
        ctx!.lineWidth = 1.5
        ctx!.beginPath()
        ctx!.arc(est.x, est.y, 10 + (1 - fixPulse) * 70, 0, Math.PI * 2)
        ctx!.stroke()
        ctx!.globalAlpha = 1
      }

      ctx!.fillStyle = colors.estimate
      ctx!.beginPath()
      ctx!.arc(est.x, est.y, 4, 0, Math.PI * 2)
      ctx!.fill()

      const truthNow = truth[truth.length - 1]
      hudTimer++
      if (hudTimer % 8 === 0 && truthNow) {
        const err = Math.hypot(est.x - truthNow.x, est.y - truthNow.y)
        if (driftRef.current) driftRef.current.textContent = `${(err / 10).toFixed(1)} m`
        if (featRef.current) featRef.current.textContent = String(tracked)
        if (fixRef.current) fixRef.current.textContent = `${sinceFix.toFixed(1)} s`
      }
    }

    function tracePath(pts: Point[]) {
      if (pts.length < 2) return
      ctx!.beginPath()
      ctx!.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx!.lineTo(pts[i].x, pts[i].y)
      ctx!.stroke()
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      step(dt)
      draw()
      raf = requestAnimationFrame(frame)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reducedMotion) renderStill()
    })
    ro.observe(canvas)

    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    const onScheme = () => {
      colors = readColors()
    }
    scheme.addEventListener('change', onScheme)

    function renderStill() {
      for (let i = 0; i < 360; i++) step(1 / 30)
      draw()
    }

    if (reducedMotion) renderStill()
    else raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      scheme.removeEventListener('change', onScheme)
    }
  }, [])

  return (
    <figure className="viz">
      <canvas
        ref={canvasRef}
        className="viz-canvas"
        role="img"
        aria-label="Simulated drone flight with GNSS denied: the estimated track drifts from the true track and is periodically corrected by terrain-relative fixes."
      />
      <div className="viz-hud" aria-hidden="true">
        <div className="hud-row">
          <span className="hud-key">GNSS</span>
          <span className="hud-val hud-denied">DENIED</span>
        </div>
        <div className="hud-row">
          <span className="hud-key">MODE</span>
          <span className="hud-val">VIO + TRN</span>
        </div>
        <div className="hud-row">
          <span className="hud-key">POS ERR</span>
          <span className="hud-val" ref={driftRef}>—</span>
        </div>
        <div className="hud-row">
          <span className="hud-key">FEATURES</span>
          <span className="hud-val" ref={featRef}>—</span>
        </div>
        <div className="hud-row">
          <span className="hud-key">SINCE FIX</span>
          <span className="hud-val" ref={fixRef}>—</span>
        </div>
      </div>
      <figcaption className="viz-legend">
        <span><i className="swatch swatch-est" />Estimate</span>
        <span><i className="swatch swatch-truth" />Ground truth</span>
        <span><i className="swatch swatch-feat" />Tracked features</span>
        <span className="viz-note">Simulation</span>
      </figcaption>
    </figure>
  )
}
