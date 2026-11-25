import NavViz from './components/NavViz'
import { CONTACT_EMAIL } from './config'

const NAV = [
  { href: '#products', label: 'Products' },
  { href: '#autonav', label: 'AutoNav' },
  { href: '#research', label: 'AI Research' },
  { href: '#sutradhar', label: 'Sutradhar' },
  { href: '#principles', label: 'How we work' },
  { href: '#contact', label: 'Contact' },
]

const PRODUCTS = [
  {
    code: '01',
    href: '#autonav',
    name: 'AutoNav',
    tagline: 'GPS-denied navigation for drones',
    body: 'A navigation stack that keeps aircraft flying when satellite positioning is jammed, spoofed or simply out of reach.',
  },
  {
    code: '02',
    href: '#research',
    name: 'AI Research',
    tagline: 'Next-gen AI-powered research',
    body: 'Generative AI for research: search, discovery and conversation over the literature and your own documents.',
  },
  {
    code: '03',
    href: '#sutradhar',
    name: 'Sutradhar',
    tagline: 'AI-assisted SDLC management',
    body: 'Requirements, traceability, tests, code analysis and legacy knowledge in one platform, with human review and a full audit trail.',
  },
]

const RESEARCH_FEATURES = [
  {
    title: 'Search',
    body: 'Ask in plain language. Semantic and keyword retrieval work together across papers, patents, reports and your private corpus.',
  },
  {
    title: 'Discovery',
    body: 'Surface related work, follow citation trails and spot emerging topics and open gaps you would not have thought to search for.',
  },
  {
    title: 'Conversation',
    body: 'Multi-turn dialogue with a body of research. Every answer is grounded in source passages and cited, so it can be checked.',
  },
  {
    title: 'Summarisation & synthesis',
    body: 'Condense a paper to what matters, or synthesise many into a structured review that compares methods, findings and limitations.',
  },
  {
    title: 'Structured extraction',
    body: 'Pull methods, datasets, parameters and results out of documents into tables you can compare and export.',
  },
  {
    title: 'Research agents',
    body: 'Multi-step agents that plan queries, read sources and assemble a report, with every step visible for review.',
  },
]

const SUTRADHAR_FEATURES = [
  {
    title: 'Requirements gap analysis',
    body: 'Find what is missing, ambiguous or contradictory in a requirements set before it turns into rework.',
  },
  {
    title: 'Bi-directional traceability',
    body: 'Generate the traceability matrix that links each requirement forward to design, code and tests, and each artefact back to the requirement it serves.',
  },
  {
    title: 'Test case generation',
    body: 'Draft test cases from the requirements themselves, each one traced back to the requirement it verifies.',
  },
  {
    title: 'Static code analysis',
    body: 'Analyse source code statically and check it for compliance with the coding standard your programme follows.',
  },
  {
    title: 'Knowledge-graph search',
    body: 'Search legacy code and documents as one connected knowledge graph, so the context behind old systems can be found instead of rediscovered.',
  },
  {
    title: 'Skeleton code generation',
    body: 'Generate skeleton code from the specification as a structured starting point for engineers to build on.',
  },
]

const DEPLOYMENT = [
  {
    title: 'On-premise',
    body: 'Fully on your own GPU servers, including air-gapped and mission-critical environments.',
  },
  { title: 'Private cloud', body: 'Deployed inside your organisation’s own private cloud.' },
  {
    title: 'MeitY-empanelled government cloud',
    body: 'Hosted on a government cloud empanelled by the Ministry of Electronics and IT (MeitY).',
  },
  { title: 'Public cloud', body: 'Run on public cloud infrastructure where your data policy permits it.' },
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
    body: 'We choose problems where the science is still open and the payoff is structural: navigation without satellites, research at the speed of thought, and software delivery that is traceable end to end.',
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
              Deep tech for <em>autonomy and intelligence.</em>
            </h1>
            <p className="lede">
              Matrion builds the hard layers of autonomy and AI. Three products: <strong>AutoNav</strong>, GPS-denied
              navigation for drones; <strong>AI Research</strong>, generative AI for search, discovery and
              conversation; and <strong>Sutradhar</strong>, AI-assisted software development life cycle management.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#products">
                See our products
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
        <section id="products" className="section" aria-labelledby="products-label">
          <p className="section-label" id="products-label">
            Products
          </p>
          <h2 className="section-title">Three products, one discipline: hard problems, done properly.</h2>
          <ul className="card-grid product-grid">
            {PRODUCTS.map((p) => (
              <li key={p.name} className="card product-card">
                <span className="approach-code">Product {p.code}</span>
                <h3>{p.name}</h3>
                <p className="product-tagline">{p.tagline}</p>
                <p>{p.body}</p>
                <a className="product-link" href={p.href}>
                  Explore {p.name} →
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="autonav" className="section focus" aria-labelledby="autonav-label">
          <p className="section-label" id="autonav-label">
            Product 01 · AutoNav
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
            AutoNav · Approach
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
            AutoNav · Applications
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

        <section id="research" className="section focus" aria-labelledby="research-label">
          <p className="section-label" id="research-label">
            Product 02 · AI Research
          </p>
          <div className="focus-grid">
            <h2>
              Next-gen <span className="nowrap">AI-powered</span> research
            </h2>
            <div className="focus-body">
              <p>
                Research is buried in more papers, patents and reports than anyone can read. Keyword search finds
                documents; it does not find answers, connections or the work you didn't know existed.
              </p>
              <p>
                AI Research brings generative AI to the whole loop: finding sources, discovering what connects them, and
                talking through them, with every claim traced back to the passage it came from.
              </p>
            </div>
          </div>
          <ul className="card-grid feature-grid" aria-label="AI Research capabilities">
            {RESEARCH_FEATURES.map((f) => (
              <li key={f.title} className="card">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="sutradhar" className="section focus" aria-labelledby="sutradhar-label">
          <p className="section-label" id="sutradhar-label">
            Product 03 · Sutradhar
          </p>
          <div className="focus-grid">
            <h2>AI-assisted software development life cycle management</h2>
            <div className="focus-body">
              <p>
                In Sanskrit theatre the sutradhar is the one who holds the threads. In software, those threads run from
                each requirement through design, code and tests. On long, regulated programmes they tangle, and
                traceability, review and compliance turn into manual work.
              </p>
              <p>
                Sutradhar automates that work across the life cycle. Every AI output goes through human review, and
                every action is recorded in a full audit trail.
              </p>
            </div>
          </div>
          <ul className="card-grid feature-grid" aria-label="Sutradhar capabilities">
            {SUTRADHAR_FEATURES.map((f) => (
              <li key={f.title} className="card">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="deployment" className="section" aria-labelledby="deployment-label">
          <p className="section-label" id="deployment-label">
            Sutradhar · Deployment
          </p>
          <h2 className="section-title">Runs where your code is allowed to live.</h2>
          <ul className="card-grid deploy-grid">
            {DEPLOYMENT.map((d) => (
              <li key={d.title} className="card">
                <h3>{d.title}</h3>
                <p>{d.body}</p>
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
          <h2 className="section-title">Building something hard?</h2>
          <p className="contact-body">
            For AutoNav, we want to hear from operators, airframe makers and integrators flying in denied environments.
            For AI Research, from research teams, labs and R&amp;D organisations drowning in literature. For Sutradhar,
            from engineering organisations that need traceable, auditable software delivery, including on-premise and
            air-gapped.
          </p>
          <a className="btn btn-primary" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Matrion LLP · Bengaluru</span>
        <span className="footer-mono">DEEP TECH · AUTONOMY · AI</span>
      </footer>
    </>
  )
}
