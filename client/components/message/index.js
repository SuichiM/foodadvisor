import React, { useEffect, useState } from 'react';

const ClosableMessage = ({ message, type, onClose }) => {
  const [isClosed, setIsClosed] = useState(false);
  const [messageColor, setMessageColor] = useState();

  const handleClose = () => {
    setIsClosed(true);
    onClose();
  };

  useEffect(() => {
    switch (type) {
      case 'success':
        setMessageColor('bg-green-100 border-green-500 text-green-700');
        break;
      case 'error':
        setMessageColor('bg-red-100 border-red-500 text-red-700');
        break;
      case 'warning':
        setMessageColor('bg-yellow-100 border-yellow-500 text-yellow-700');
        break;
      default:
        setMessageColor('bg-blue-100 border-blue-500 text-blue-700');
        break;
    }
  }, [type]);

  return (
    <div
      className={`${
        isClosed ? 'hidden' : 'block'
      } ${messageColor} border px-4 py-3 rounded relative`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-blue-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={handleClose}
        >
          <title>Close</title>
          <path
            d="M14.348 5.65a.5.5 0 0 1 0 .707L11.05 10l3.297 3.646a.5.5 0 1 1-.708.708L10 10.707l-3.646 3.297a.5.5 0 1 1-.708-.708L9.293 10 5.597 6.354a.5.5 0 1 1 .708-.708L10 9.293l3.646-3.297a.5.5 0 0 1 .707 0z"
            fillRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default ClosableMessage;
