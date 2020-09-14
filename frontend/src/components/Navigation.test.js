import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Navigation from './Navigation'

describe('Navigation', () => {
  beforeEach(() => {
    render(<Navigation />)
  })

  it('renders Share-a-ride', () => {
    expect(screen.getByText('Share-a-ride')).toBeInTheDocument()
  })

  it('renders login link', () => {
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('renders search link', () => {
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('renders add trip link', () => {
    expect(screen.getByText('Add trip')).toBeInTheDocument()
  })
})
