import React from 'react'
import {describe, test, expect} from '@testing-library/jest-dom/extend-expect'
import {screen, render} from '@testing-library/react'
import SearchTrip from './SearchTrip'

describe('SearchTrip', () => {
  beforeEach(() => {
    render(<SearchTrip />)
  })

  test('renders the component', () => {
    expect(screen.findByRole('searchbox')).toBeInTheDocument()
  })

  test('renders start location input', () => {
    expect(screen.getByLabelText('start')).toBeInTheDocument()
  })

  test('renders destination input', () => {
    expect(screen.getByLabelText('destination')).toBeInTheDocument()

  })

  test('renders date selector', () => {
    expect(screen.getByLabelText('date')).toBeInTheDocument()
  })

  test('renders time selector', () => {
    expect(screen.getByLabelText('time')).toBeInTheDocument()
  })

  test('renders seats selector', () => {
    expect(screen.getByLabelText('seats')).toBeInTheDocument()
  })

  test('renders price selector', () => {
    expect(screen.getByLabelText('price')).toBeInTheDocument()
  })
})