import NavViz from './components/NavViz'
import { CONTACT_EMAIL } from './config'

const NAV = [
  { href: '#focus', label: 'Current focus' },
  { href: '#approach', label: 'Approach' },
  { href: '#applications', label: 'Applications' },
  { href: '#principles', label: 'How we work' },
  { href: '#contact', label: 'Contact' },
]

const APPROACH = [
  {
    code: '01',
    title: 'Visual-inertial odometry',
    body: 'Downward and forward cameras track thousands of image features frame to frame. Fused with IMU pre-integration, they give high-rate relative motion, even when there is no signal to lock onto.',
  },
  {
    code: '02',
    title: 'Terrain-relative navigation',
    body: 'Odometry drifts. We bound that drift by matching what the drone sees against onboard maps: orthoimagery, elevation models and semantic landmarks. Each match is an absolute fix.',
  },
  {
    code: '03',
    title: 'Multi-sensor fusion',
    body: 'An error-state filter combines vision, inertial, barometric, magnetometer and range sensors, and carries an honest estimate of its own uncertainty that autonomy can act on.',
  },
  {
    code: '04',
    title: 'Integrity monitoring',
    body: 'The system watches for GNSS spoofing and jamming and rejects inconsistent measurements. It degrades gracefully instead of failing silently when a sensor is lying.',
  },
  {
    code: '05',
    title: 'Edge-native compute',
    body: 'The full stack is built to run in real time on low-SWaP embedded hardware, with no cloud link, no ground station dependency and no data leaving the aircraft.',
  },
]

const APPLICATIONS = [
  { title: 'Contested airspace', body: 'Keep flying when GNSS is jammed or spoofed.' },
  { title: 'Indoor & underground', body: 'Warehouses, tunnels, mines and plant interiors where satellites never reach.' },
  { title: 'Urban canyons', body: 'Multipath and occlusion between tall structures degrade fixes unpredictably.' },
  { title: 'Infrastructure inspection', body: 'Close-proximity flight near bridges, towers and turbines that shadow the sky.' },
  { title: 'Search & rescue', body: 'Dense canopy, ravines and disaster zones where positioning cannot be assumed.' },
  { title: 'Remote & maritime', body: 'Long-range missions where navigation must hold for the whole sortie.' },
]

const PRINCIPLES = [
  {
    title: 'First principles, then flight',
    body: 'We start from estimation theory and the physics of the sensors, then prove it in the air. A demo that only works in simulation is not finished.',
  },
  {
    title: 'Measure everything',
    body: 'Every claim is backed by logged flights against ground truth, and by error budgets we can defend.',
  },
  {
    title: 'Hard problems on purpose',
    body: 'We choose problems where the science is still open and the payoff is structural. GPS-denied navigation is the first.',
  },
]

export default function App() {
  return (
    <>
      <header className="hero" role="banner">
        <nav className="topnav" aria-label="Primary">
          <a className="brand" href="#top" aria-label="Matrion home">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="brand-mark">
              <path d="M7 24V8l9 10 9-10v16" />
            </svg>
            <span>Matrion</span>
          </a>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Matrion · Deep tech</p>
            <h1>
              Deep tech for machines that <em>navigate without satellites.</em>
            </h1>
            <p className="lede">
              Matrion builds the hard layers of autonomy: perception, estimation and embedded compute. Right now we are
              focused on one problem: <strong>GPS-denied navigation for drones.</strong>
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#focus">
                See what we're building
              </a>
              <a className="btn btn-ghost" href="#contact">
                Work with us
              </a>
            </div>
          </div>
          <NavViz />
        </div>
      </header>

      <main>
        <section id="focus" className="section focus" aria-labelledby="focus-label">
          <p className="section-label" id="focus-label">
            Current focus
          </p>
          <div className="focus-grid">
            <h2>GPS-denied navigation for drones</h2>
            <div className="focus-body">
              <p>
                Almost every drone flying today trusts GNSS for position. That signal is weak, it is easy to jam or
                spoof, and it disappears indoors, underground, under canopy and between buildings. When it goes, most
                aircraft either drift, land or fall.
              </p>
              <p>
                We are building a navigation stack that does not need it. It estimates the drone's position from what
                the aircraft can sense for itself, bounds the error against maps of the world, and knows how confident
                it should be at every moment.
              </p>
              <ul className="status-list" aria-label="Programme status">
                <li>
                  <span className="dot dot-live" aria-hidden="true" /> Active R&amp;D programme
                </li>
                <li>
                  <span className="dot" aria-hidden="true" /> Open to flight-test and integration partners
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="approach" className="section" aria-labelledby="approach-label">
          <p className="section-label" id="approach-label">
            Approach
          </p>
          <h2 className="section-title">Five layers, one estimate you can trust.</h2>
          <ol className="approach-list">
            {APPROACH.map((a) => (
              <li key={a.code} className="approach-item">
                <span className="approach-code">{a.code}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="applications" className="section" aria-labelledby="applications-label">
          <p className="section-label" id="applications-label">
            Applications
          </p>
          <h2 className="section-title">Where satellites can't be trusted.</h2>
          <ul className="card-grid">
            {APPLICATIONS.map((a) => (
              <li key={a.title} className="card">
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="principles" className="section" aria-labelledby="principles-label">
          <p className="section-label" id="principles-label">
            How we work
          </p>
          <h2 className="section-title">A deep tech company, built for hard problems.</h2>
          <div className="principles">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="principle">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-label">
          <p className="section-label" id="contact-label">
            Contact
          </p>
          <h2 className="section-title">Flying where GNSS won't reach?</h2>
          <p className="contact-body">
            We want to hear from operators, airframe makers, integrators and researchers working on navigation in
            denied environments.
          </p>
          <a className="btn btn-primary" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Matrion</span>
        <span className="footer-mono">DEEP TECH · AUTONOMY · NAVIGATION</span>
      </footer>
    </>
  )
}
