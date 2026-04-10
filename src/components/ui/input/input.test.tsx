import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Test Placeholder" />)
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
  })

  it('updates value on change', () => {
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Hello' } })
    expect(input.value).toBe('Hello')
  })

  it('displays error message and sets aria-invalid when error and id are provided', () => {
    render(<Input id="test-input" error="Invalid field" placeholder="Error test" />)
    const input = screen.getByPlaceholderText('Error test')
    
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
    expect(screen.getByText('Invalid field')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid field')
  })

  it('does not display error message if id is missing even if error is provided', () => {
    render(<Input error="Invalid field" placeholder="Missing ID test" />)
    expect(screen.queryByText('Invalid field')).not.toBeInTheDocument()
  })

  it('is disabled when the disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled test" />)
    const input = screen.getByPlaceholderText('Disabled test')
    expect(input).toBeDisabled()
  })
})
