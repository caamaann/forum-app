import React from 'react';
import PropTypes from 'prop-types';

function Textarea({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  required,
  rows,
  ...props
}) {
  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
        required={required}
        rows={rows}
        {...props}
      />
    </>
  );
}

Textarea.propTypes = {
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  rows: PropTypes.number,
};

Textarea.defaultProps = {
  required: false,
  label: '',
  type: 'text',
  placeholder: '',
  value: '',
  onChange: () => {},
  className: '',
  rows: 8,
};

export default Textarea;
