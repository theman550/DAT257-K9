import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import App from './App'

let app

beforeEach(() => {
  app = render(<App />)
})

it('renders loading...', () => {
  expect(app.container).toHaveTextContent('loading...')
})

it('renders hello world', () => {
  setTimeout(() => expect(app.container).toHaveTextContent('Hello -> World'), 1000)
})