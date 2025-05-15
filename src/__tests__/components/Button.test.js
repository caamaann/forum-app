/**
 * Scenario:
 * - Button component:
 *   - should display the button with correct text
 *   - should call onClick function when clicked
 *   - should be disabled when disabled prop is true
 *   - should render with different variants
 *   - should render as full width when fullWidth is true
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/common/Button';

describe('Button component', () => {
  it('should display the button with correct text', () => {
    // Arrange
    const buttonText = 'Click me';

    // Action
    render(<Button>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
    expect(buttonElement.type).toBe('button');
  });

  it('should call onClick function when clicked', () => {
    // Arrange
    const buttonText = 'Click me';
    const mockOnClick = jest.fn();

    // Action
    render(<Button onClick={mockOnClick}>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);

    // Simulate a click
    fireEvent.click(buttonElement);

    // Assert
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    // Arrange
    const buttonText = 'Click me';
    const mockOnClick = jest.fn();

    // Action
    render(<Button disabled>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);

    // Simulate a click on disabled button
    fireEvent.click(buttonElement);

    // Assert
    expect(buttonElement).toBeDisabled();
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should render with different variants', () => {
    // Arrange
    const buttonText = 'Click me';
    const variants = ['primary', 'secondary', 'danger', 'success', 'outline'];

    // Action and Assert for each variant
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>{buttonText}</Button>);
      const buttonElement = screen.getByText(buttonText);

      // Check for variant-specific classes
      if (variant === 'primary') {
        expect(buttonElement).toHaveClass('bg-blue-600');
      } else if (variant === 'secondary') {
        expect(buttonElement).toHaveClass('bg-gray-200');
      } else if (variant === 'danger') {
        expect(buttonElement).toHaveClass('bg-red-600');
      } else if (variant === 'success') {
        expect(buttonElement).toHaveClass('bg-green-600');
      } else if (variant === 'outline') {
        expect(buttonElement).toHaveClass('border');
        expect(buttonElement).toHaveClass('border-gray-300');
      }

      unmount();
    });
  });

  it('should render as full width when fullWidth is true', () => {
    // Arrange
    const buttonText = 'Click me';

    // Action
    render(<Button fullWidth>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);

    // Assert
    expect(buttonElement).toHaveClass('w-full');
  });

  it('should render with the correct button type', () => {
    // Arrange
    const buttonText = 'Click me';
    const types = ['button', 'submit', 'reset'];

    // Action and Assert for each type
    types.forEach((type) => {
      const { unmount } = render(<Button type={type}>{buttonText}</Button>);
      const buttonElement = screen.getByText(buttonText);

      expect(buttonElement.type).toBe(type);

      unmount();
    });
  });

  it('should apply additional className when provided', () => {
    // Arrange
    const buttonText = 'Click me';
    const additionalClass = 'custom-class';

    // Action
    render(<Button className={additionalClass}>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);

    // Assert
    expect(buttonElement).toHaveClass(additionalClass);
  });
});
