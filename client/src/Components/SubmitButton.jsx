import React from 'react';

const SubmitButton = ({ children, loading }) => {
  const buttonClass =
    'bg-black text-white m-7 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-gray-800';
  return (
    <button type="submit" className={buttonClass} disabled={loading}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default SubmitButton;
