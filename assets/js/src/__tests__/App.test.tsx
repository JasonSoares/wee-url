import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createShortUrl } from '../services/api'
import App from '../App'

const setup = () => render(<App />)

jest.mock('../services/api', () => ({
  createShortUrl: jest.fn(),
}))

const mockCreateShortUrl = createShortUrl as jest.Mock<any>

describe('<App />', () => {
  it('renders the header', () => {
    const { getByText } = setup()

    expect(getByText('wee url')).toBeInTheDocument()
  })

  it('renders the form', () => {
    const { getByLabelText, getByText } = setup()

    expect(getByLabelText('Enter a url')).toBeInTheDocument()
    expect(getByText('Shorten')).toBeInTheDocument()
  })

  describe('form submission', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('renders an error when the entered url is invalid', async () => {
      const { getByText, getByLabelText, queryByText } = setup()

      userEvent.type(getByLabelText('Enter a url'), 'www.google.com')
      userEvent.click(getByText('Shorten'))

      await waitFor(() => expect(queryByText('Please enter a valid url starting with http:// or https://')).toBeInTheDocument())
      expect(mockCreateShortUrl).not.toHaveBeenCalled()
    })

    it('renders an error when the entered url is for the same domain', async () => {
      const { getByText, getByLabelText, queryByText } = setup()

      userEvent.type(getByLabelText('Enter a url'), 'http://localhost')
      userEvent.click(getByText('Shorten'))
      await waitFor(() => expect(queryByText('URL is already wee')).toBeInTheDocument())

      expect(mockCreateShortUrl).not.toHaveBeenCalled()
    })

    it('renders a success message when a short URL is created', async () => {
      const {
        getByDisplayValue,
        getAllByText,
        getByText,
        getByLabelText,
        queryByText,
      } = setup()

      mockCreateShortUrl.mockReturnValue({
        data: {
          url: 'http://www.example.com',
          slug: 'abc123',
        },
      })

      userEvent.type(getByLabelText('Enter a url'), 'http://www.example.com')
      userEvent.click(getByText('Shorten'))
      await waitFor(() => expect(queryByText('Successfully created wee URL!')).toBeInTheDocument())
      expect(mockCreateShortUrl).toHaveBeenCalledWith('http://www.example.com')
      expect(getByText('http://www.example.com')).toBeInTheDocument() // in the recent list
      expect(getAllByText('Copy')).toHaveLength(2) // one for the form, one for recent history
      expect(getByText('http://localhost/abc123')).toBeInTheDocument() // in the recent list
      expect(getByDisplayValue('http://localhost/abc123')).toBeInTheDocument() // in the form text box
    })
  })
})
