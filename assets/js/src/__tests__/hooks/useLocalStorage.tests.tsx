import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { useLocalStorage } from '../../hooks'

function setup(key: string, initialValue: string, nextValue: string) {
  function TestComponent() {
    const [value, setValue] = useLocalStorage<string>(key, initialValue)
    const testRead = () => value
    const testWrite = () => {
      setValue(nextValue)
    }

    return (
      <div>
        <button type="button" onClick={testRead}>Read</button>
        <button type="button" onClick={testWrite}>Write</button>
      </div>
    )
  }
  return render(<TestComponent />)
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
  })

  it('should call localStorage functions with expected values', () => {
    const { getByText } = setup('test', 'a', 'new value')

    // initialization
    expect(window.localStorage.getItem).toHaveBeenCalledWith('test')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('test', '"a"')

    // interaction
    fireEvent.click(getByText('Read'))
    fireEvent.click(getByText('Write'))

    expect(window.localStorage.getItem).toHaveBeenCalledWith('test')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('test', '"new value"')
  })
})
