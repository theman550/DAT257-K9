import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Notification from './Notification'

describe('Notification', () => {
  it('renders a notification with message', () => {
    render(<Notification msg='message' color='green' />)
    expect(screen.getByText('message')).toBeInTheDocument()
  })
})