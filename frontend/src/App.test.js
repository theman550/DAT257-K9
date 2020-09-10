import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import App from './App'

it('renders loading...', () => {
  const component = render(<App />)

  expect(component.container).toHaveTextContent('loading...')
})