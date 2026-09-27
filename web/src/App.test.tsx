import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Matrion site', () => {
  it('shows the Matrion brand and deep-tech positioning in the hero', () => {
    render(<App />)
    const hero = screen.getByRole('banner')
    expect(within(hero).getAllByText(/matrion/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/deep tech/i)
  })

  it('states that GPS-denied drone navigation is the current focus', () => {
    render(<App />)
    const focus = screen.getByRole('region', { name: /current focus/i })
    expect(within(focus).getByRole('heading', { level: 2 })).toHaveTextContent(/gps-denied navigation/i)
    expect(focus).toHaveTextContent(/drones/i)
  })

  it('explains the navigation approach as a set of named techniques', () => {
    render(<App />)
    const approach = screen.getByRole('region', { name: /approach/i })
    for (const technique of [/visual-inertial odometry/i, /terrain/i, /sensor fusion/i]) {
      expect(within(approach).getByText(technique)).toBeInTheDocument()
    }
  })

  it('has in-page navigation to every section', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /primary/i })
    for (const link of within(nav).getAllByRole('link')) {
      const target = link.getAttribute('href')
      expect(target).toMatch(/^#/)
      expect(document.querySelector(target!), `missing section for ${target}`).not.toBeNull()
    }
  })

  it('renders the live navigation visualisation with an accessible description', () => {
    render(<App />)
    expect(screen.getByRole('img', { name: /gnss.*denied/i })).toBeInTheDocument()
  })
})
