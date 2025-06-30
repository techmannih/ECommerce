import React from 'react';

const FormError = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

export default FormError;
