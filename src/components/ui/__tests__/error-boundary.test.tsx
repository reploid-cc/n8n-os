import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary, ErrorFallback } from '../error-boundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Đã xảy ra lỗi')).toBeInTheDocument()
    expect(screen.getByText(/Xin lỗi, đã có lỗi xảy ra/)).toBeInTheDocument()
  })

  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('should call onError callback when error occurs', () => {
    const onError = jest.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    )
  })
})

describe('ErrorFallback', () => {
  it('should render error message', () => {
    render(<ErrorFallback />)

    expect(screen.getByText('Đã xảy ra lỗi')).toBeInTheDocument()
    expect(screen.getByText(/Xin lỗi, có lỗi xảy ra/)).toBeInTheDocument()
  })

  it('should render retry button when onRetry is provided', () => {
    const onRetry = jest.fn()
    render(<ErrorFallback onRetry={onRetry} />)

    expect(screen.getByText('Thử lại')).toBeInTheDocument()
  })

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorFallback />)

    expect(screen.queryByText('Thử lại')).not.toBeInTheDocument()
  })
})
