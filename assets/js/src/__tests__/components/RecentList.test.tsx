import React from 'react'
import { render } from '@testing-library/react'
import RecentList, { Props as RecentListProps } from '../../components/RecentList'

const defaultProps: RecentListProps = {
  shortUrls: [
    { shortUrl: 'http://short/url', url: 'http://www.example.com' },
    { shortUrl: 'http://short/abc', url: 'http://github.com' },
  ],
  onCopy: jest.fn(),
}

const setup = (props: RecentListProps = defaultProps) => render(<RecentList {...props} />)

describe('<RecentList />', () => {
  it('remders the list of recent items', () => {
    const { getByText, getAllByText } = setup()

    expect(getByText('http://short/url')).toBeInTheDocument()
    expect(getByText('http://www.example.com')).toBeInTheDocument()
    expect(getByText('http://short/abc')).toBeInTheDocument()
    expect(getByText('http://github.com')).toBeInTheDocument()
    expect(getAllByText('Copy')).toHaveLength(2)
  })
})
