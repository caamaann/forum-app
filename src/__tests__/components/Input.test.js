/**
 * Scenario:
 * - Input component:
 *   - should render input correctly
 *   - should display label when provided
 *   - should update input value when user types
 *   - should call onChange function when input changes
 *   - should display different input types
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/common/Input';

describe('Input component', () => {
  it('should render input correctly', () => {
    // Arrange
    const inputId = 'test-input';
    const placeholder = 'Enter text here';

    // Action
    render(<Input id={inputId} placeholder={placeholder} />);
    const inputElement = screen.getByPlaceholderText(placeholder);

    // Assert
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement).toHaveAttribute('id', inputId);
  });

  it('should display label when provided', () => {
    // Arrange
    const inputId = 'test-input';
    const labelText = 'Test Label';

    // Action
    render(<Input id={inputId} label={labelText} />);
    const labelElement = screen.getByText(labelText);

    // Assert
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement).toHaveAttribute('for', inputId);
  });

  it('should update input value when user types', () => {
    // Arrange
    const inputId = 'test-input';
    const inputValue = 'Hello World';

    // Action
    render(<Input id={inputId} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: inputValue } });

    // Assert
    expect(inputElement.value).toBe(inputValue);
  });

  it('should call onChange function when input changes', () => {
    // Arrange
    const inputId = 'test-input';
    const inputValue = 'Hello World';
    const mockOnChange = jest.fn();

    // Action
    render(<Input id={inputId} onChange={mockOnChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: inputValue } });

    // Assert
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should display different input types', () => {
    // Arrange
    const inputId = 'test-input';
    const inputTypes = ['text', 'email', 'password', 'number', 'tel'];

    inputTypes.forEach((type) => {
      // Action
      const { unmount, getByTestId } = render(
        <Input id={inputId} type={type} data-testid="input-element" />
      );

      // Assert - find by test id since some input types don't have specific roles
      const inputElement = getByTestId('input-element');
      expect(inputElement).toHaveAttribute('type', type);
      unmount();
    });
  });

  it('should mark input as required when required prop is true', () => {
    // Arrange
    const inputId = 'test-input';

    // Action
    render(<Input id={inputId} required />);
    const inputElement = screen.getByRole('textbox');

    // Assert
    expect(inputElement).toHaveAttribute('required');
  });

  it('should apply additional className when provided', () => {
    // Arrange
    const inputId = 'test-input';
    const customClass = 'custom-input-class';

    // Action
    render(<Input id={inputId} className={customClass} />);
    const inputElement = screen.getByRole('textbox');

    // Assert
    expect(inputElement).toHaveClass(customClass);
  });
});
