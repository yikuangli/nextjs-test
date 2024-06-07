"use client"
import React, { useState } from 'react';
import { deleteEvent } from '@/app/lib/query'; // Ensure this function is defined in your query file

interface DeleteButtonProps {
  eventId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ eventId }) => {
  const [showModal, setShowModal] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!passphrase) {
      setError('Passphrase is required');
      return;
    }

    try {
      await deleteEvent(eventId, passphrase);
      setShowModal(false);
      setPassphrase('');
      window.location.reload(); // Reload the page to reflect the changes
    } catch (err) {
      setError('Invalid passphrase or failed to delete event');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Event</h2>
            <p className="mb-4">Enter the passphrase to delete the event:</p>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
