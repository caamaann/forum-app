import React from 'react';
import PropTypes from 'prop-types';

function Button({
  type = 'button',
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
}) {
  const baseClasses =
    'px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
    success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:text-gray-400',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'outline']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  onClick: null,
  disabled: false,
  fullWidth: false,
  className: '',
};

export default Button;
