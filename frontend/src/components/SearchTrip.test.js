import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {screen, render} from '@testing-library/react'
import SearchTrip from './SearchTrip'

describe('SearchTrip', () => {
  beforeEach(() => {
    render(<SearchTrip />)
  })

  test('renders header', () => {
    expect(screen.getByText('Search for trips')).toBeInTheDocument()
  })

  test('renders the form', () => {
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  test('renders start location input', () => {
    expect(screen.getByLabelText('From:')).toBeInTheDocument()
  })

  test('renders destination input', () => {
    expect(screen.getByLabelText('To:')).toBeInTheDocument()

  })

  test('renders date selector', () => {
    expect(screen.getByLabelText('Date:')).toBeInTheDocument()
  })

  test('renders time selector', () => {
    expect(screen.getByLabelText('Time:')).toBeInTheDocument()
  })

  test('renders seats selector', () => {
    expect(screen.getByLabelText('Seats:')).toBeInTheDocument()
  })

  test('renders price selector', () => {
    expect(screen.getByLabelText('Price:')).toBeInTheDocument()
  })

  test('renders search button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})