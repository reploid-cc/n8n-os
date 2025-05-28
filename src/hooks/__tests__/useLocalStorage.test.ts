import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  it('should return initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('initial')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key')
  })

  it('should return stored value from localStorage', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('stored-value')
  })

  it('should update localStorage when value changes', () => {
    localStorageMock.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('new-value')
    })

    expect(result.current[0]).toBe('new-value')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
  })

  it('should handle function updates', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('initial'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1](prev => prev + '-updated')
    })

    expect(result.current[0]).toBe('initial-updated')
  })

  it('should handle localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))

    expect(result.current[0]).toBe('fallback')
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
