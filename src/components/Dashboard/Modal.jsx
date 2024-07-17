import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <button
          onClick={onClose}
          className="text-red-500 float-right"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
