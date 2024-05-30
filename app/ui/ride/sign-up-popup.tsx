"use client"
import React, { useState } from 'react';
import { addUserToEvent } from '@/app/lib/query';
import router from 'next/router';

interface SignUpComponentProps {
  eventId: string;

}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ eventId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    if (username) {
      try {
        await addUserToEvent(eventId, username);
        // onUserAdded(username);
        setShowPopup(false);
        setUsername('');
      } catch (err) {
        console.error('Failed to sign up:', err);
      }
    }
  };

  return (
    <>
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => setShowPopup(true)}
      >
        Sign Up
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Sign Up for the Event</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpComponent;
