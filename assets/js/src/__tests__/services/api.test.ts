import { createShortUrl } from '../../services/api'

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
})) as jest.Mock

describe('API', () => {
  it('should call fetch with the correct arguments', () => {
    createShortUrl('http://www.example.com')
    const expectedBody = '{"link":{"url":"http://www.example.com"}}'
    const expectedHeaders = { 'Content-Type': 'application/json' }
    const expectedMethod = 'POST'

    expect(fetch).toHaveBeenCalledWith('/api/links', { body: expectedBody, headers: expectedHeaders, method: expectedMethod })
  })
})
