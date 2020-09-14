import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('renders navigation', () => {
    expect(screen.getByText('Share-a-ride')).toBeInTheDocument()
  })

  it('renders home', () => {
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})