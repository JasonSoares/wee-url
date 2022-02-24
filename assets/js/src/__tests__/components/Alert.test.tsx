import React from 'react'
import { render } from '@testing-library/react'
import Alert, { Props as AlertProps } from '../../components/Alert'

const defaultProps: AlertProps = {
  message: 'here is an alert',
  type: 'success',
}

const setup = (props: AlertProps = defaultProps) => render(<Alert {...props} />)

describe('<Alert />', () => {
  it('renders the given message', () => {
    const { getByText } = setup()

    expect(getByText('here is an alert')).toBeInTheDocument()
  })
})
