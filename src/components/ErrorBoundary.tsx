'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import ErrorPopup from './ErrorPopup'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleClose = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  public render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorPopup error={this.state.error} onClose={this.handleClose} />
    }

    return this.props.children
  }
} 