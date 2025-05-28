import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

// Mock timers
jest.useFakeTimers()

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))

    expect(result.current).toBe('initial')
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 500 })

    // Value should not change immediately
    expect(result.current).toBe('initial')

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now value should be updated
    expect(result.current).toBe('updated')
  })

  it('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    // Update value multiple times rapidly
    rerender({ value: 'update1', delay: 500 })

    act(() => {
      jest.advanceTimersByTime(250)
    })

    rerender({ value: 'update2', delay: 500 })

    act(() => {
      jest.advanceTimersByTime(250)
    })

    // Value should still be initial
    expect(result.current).toBe('initial')

    // Complete the debounce
    act(() => {
      jest.advanceTimersByTime(250)
    })

    // Should have the latest value
    expect(result.current).toBe('update2')
  })

  it('should handle different delay values', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 1000 },
    })

    rerender({ value: 'updated', delay: 1000 })

    // Should not update after 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('initial')

    // Should update after 1000ms
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('updated')
  })
})
