import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)

// jsdom has no canvas implementation. Return a context whose every method is a no-op
// so the nav visualisation can mount; its drawing is not what these tests assert on.
HTMLCanvasElement.prototype.getContext = function () {
  return new Proxy({}, { get: () => () => {}, set: () => true })
} as unknown as HTMLCanvasElement['getContext']

// jsdom lacks matchMedia, which the visualisation reads for prefers-reduced-motion.
window.matchMedia = (query: string) =>
  ({ matches: false, media: query, addEventListener: () => {}, removeEventListener: () => {} }) as unknown as MediaQueryList

globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver

// index.css isn't loaded under jsdom; define the tokens NavViz reads so it fails fast only on real gaps.
for (const name of ['--viz-grid', '--viz-landmark', '--viz-tracked', '--viz-truth', '--viz-fix', '--accent']) {
  document.documentElement.style.setProperty(name, '#000')
}
