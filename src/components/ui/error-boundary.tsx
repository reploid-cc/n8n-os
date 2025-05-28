'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './button'
import { Card } from './card'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Đã xảy ra lỗi</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.
          </p>
          <Button onClick={() => this.setState({ hasError: false, error: null })}>Thử lại</Button>
        </div>
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  onRetry?: () => void
}

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <Card className="mx-auto max-w-md p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Đã xảy ra lỗi</h2>
          <p className="mt-1 text-sm text-gray-600">Xin lỗi, có lỗi xảy ra khi tải nội dung này.</p>
          {error && process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">
                Chi tiết lỗi (chỉ hiển thị trong development)
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Thử lại
          </Button>
        )}
      </div>
    </Card>
  )
}
