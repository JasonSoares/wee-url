import React from 'react'
import { render } from '@testing-library/react'
import Header from '../../components/Header'

const setup = () => render(<Header />)

describe('<Alert />', () => {
  it('renders the title', () => {
    const { getByText } = setup()

    expect(getByText('🦊')).toBeInTheDocument()
    expect(getByText('wee url')).toBeInTheDocument()
  })
})
