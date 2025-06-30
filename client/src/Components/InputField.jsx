import React, { useState } from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, placeholder = '', autoComplete, autoFocus }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const fieldType = isPassword && show ? 'text' : type;
  return (
    <div className={`mb-4 ${isPassword ? 'relative' : ''}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type={fieldType}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 w-full border rounded-md"
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-9 text-xs text-gray-600"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
  );
};

export default InputField;
