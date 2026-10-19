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

  it('calls out exactly two products: AutoNav and AI-powered research', () => {
    render(<App />)
    const products = screen.getByRole('region', { name: /^products$/i })
    const names = within(products)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
    expect(names).toHaveLength(2)
    expect(names[0]).toMatch(/autonav/i)
    expect(names[1]).toMatch(/ai.*research/i)
    for (const link of within(products).getAllByRole('link')) {
      const target = link.getAttribute('href')
      expect(document.querySelector(target!), `missing product section for ${target}`).not.toBeNull()
    }
  })

  it('presents AutoNav as GPS-denied navigation for drones', () => {
    render(<App />)
    const autonav = screen.getByRole('region', { name: /product 01.*autonav/i })
    expect(within(autonav).getByRole('heading', { level: 2 })).toHaveTextContent(/gps-denied navigation/i)
    expect(autonav).toHaveTextContent(/drones/i)
  })

  it('presents the AI research product with search, discovery and conversation', () => {
    render(<App />)
    const research = screen.getByRole('region', { name: /product 02.*ai research/i })
    expect(within(research).getByRole('heading', { level: 2 })).toHaveTextContent(/ai-powered research/i)
    const features = within(research)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
    for (const feature of [/search/i, /discovery/i, /conversation/i]) {
      expect(features.some((f) => feature.test(f ?? '')), `missing feature ${feature}`).toBe(true)
    }
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
