import { useState } from 'react';

const UserMenu = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-right">
      <button
        onClick={handleToggleMenu}
        className="text-gray-600 hover:text-gray-900"
      >
        Hi, {username} ▼
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 bg-white border rounded shadow-lg">
          <button
            onClick={() => {
              handleToggleMenu();
              onLogout && onLogout();
            }}
            className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
          <button
            onClick={() => {} /* Handle settings */}
            className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
