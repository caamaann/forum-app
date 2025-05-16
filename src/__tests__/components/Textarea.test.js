/**
 * Scenario:
 * - Textarea component:
 *   - should render textarea correctly
 *   - should display label when provided
 *   - should update textarea value when user types
 *   - should call onChange function when textarea changes
 *   - should set the number of rows correctly
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from '../../components/common/Textarea';

describe('Textarea component', () => {
  it('should render textarea correctly', () => {
    // Arrange
    const textareaId = 'test-textarea';
    const placeholder = 'Enter text here';

    // Action
    render(<Textarea id={textareaId} placeholder={placeholder} />);
    const textareaElement = screen.getByPlaceholderText(placeholder);

    // Assert
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement.tagName).toBe('TEXTAREA');
    expect(textareaElement).toHaveAttribute('id', textareaId);
  });

  it('should display label when provided', () => {
    // Arrange
    const textareaId = 'test-textarea';
    const labelText = 'Test Label';

    // Action
    render(<Textarea id={textareaId} label={labelText} />);
    const labelElement = screen.getByText(labelText);

    // Assert
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement).toHaveAttribute('for', textareaId);
  });

  it('should update textarea value when user types', () => {
    // Arrange
    const textareaId = 'test-textarea';
    const textValue = 'Hello World\nThis is a multi-line text';

    // Action
    render(<Textarea id={textareaId} />);
    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: textValue } });

    // Assert
    expect(textareaElement.value).toBe(textValue);
  });

  it('should call onChange function when textarea changes', () => {
    // Arrange
    const textareaId = 'test-textarea';
    const textValue = 'Hello World\nThis is a multi-line text';
    const mockOnChange = jest.fn();

    // Action
    render(<Textarea id={textareaId} onChange={mockOnChange} />);
    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: textValue } });

    // Assert
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should set the number of rows correctly', () => {
    // Arrange
    const textareaId = 'test-textarea';
    const rows = 10;

    // Action
    render(<Textarea id={textareaId} rows={rows} />);
    const textareaElement = screen.getByRole('textbox');

    // Assert
    expect(textareaElement).toHaveAttribute('rows', rows.toString());
  });

  it('should mark textarea as required when required prop is true', () => {
    // Arrange
    const textareaId = 'test-textarea';

    // Action
    render(<Textarea id={textareaId} required />);
    const textareaElement = screen.getByRole('textbox');

    // Assert
    expect(textareaElement).toHaveAttribute('required');
  });

  it('should apply additional className when provided', () => {
    // Arrange
    const textareaId = 'test-textarea';
    const customClass = 'custom-textarea-class';

    // Action
    render(<Textarea id={textareaId} className={customClass} />);
    const textareaElement = screen.getByRole('textbox');

    // Assert
    expect(textareaElement).toHaveClass(customClass);
  });
});
