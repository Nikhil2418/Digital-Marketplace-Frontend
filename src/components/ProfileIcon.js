import React, { useState } from 'react';

const ProfileIcon = ({ user }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-white">
        <img
          src="/path-to-profile-icon.png" // Or use a font-awesome icon or similar
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
          <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
