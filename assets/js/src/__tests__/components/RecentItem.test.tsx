import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecentItem, { Props as RecentItemProps } from '../../components/RecentItem'

const mockCopy = jest.fn()

const defaultProps: RecentItemProps = {
  shortUrl: 'http://short/url',
  url: 'http://www.example.com',
  onCopy: mockCopy,
}

const setup = (props: RecentItemProps = defaultProps) => render(<RecentItem {...props} />)

describe('<RecentItem />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { getByText } = setup()

    expect(getByText('http://short/url')).toBeInTheDocument()
    expect(getByText('http://www.example.com')).toBeInTheDocument()
    expect(getByText('Copy')).toBeInTheDocument()
  })

  it('invokes onCopy with the shortUrl when Copy is clicked', () => {
    const { getByText } = setup()

    userEvent.click(getByText('Copy'))
    expect(mockCopy).toHaveBeenCalledWith('http://short/url')
  })
})
