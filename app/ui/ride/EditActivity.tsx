"use client"
import React, { useState } from 'react';
import { updateEvent, validatePassphrase } from '@/app/lib/query'; // Ensure these functions are defined in your query file
import { TActivity } from '@/app/lib/definitions';
import { RideAreas, RidePace } from '@/app/lib/utils';

interface EditButtonProps {
  event: TActivity
}

const EditButton: React.FC<EditButtonProps> = ({ event, }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPassphraseModal, setShowPassphraseModal] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [formData, setFormData] = useState({
    title: event.title,
    route_length: event.route_length,
    ride_pace: event.ride_pace,
    area: event.area,
    time: new Date(event.time).toISOString().substring(0, 16),
    description: event.description,
    location: event.location,
    start_point_address: event.start_point_address,
    event_leader_name: event.event_leader_name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePassphraseSubmit = async () => {
    const isValid = await validatePassphrase(event.id, passphrase);
    if (isValid) {
      setShowPassphraseModal(false);
      setShowModal(true);
    } else {
      alert('Invalid passphrase');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateEvent(event.id, formData);
      setShowModal(false);
      // onUpdate(); // Trigger the parent component to update the list
    } catch (err) {
      console.error('Failed to update event', err);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPassphraseModal(true)}
        className="text-blue-500 hover:text-blue-700"
      >
        Edit
      </button>

      {showPassphraseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Enter Passphrase</h2>
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Passphrase"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setShowPassphraseModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handlePassphraseSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg flex flex-col max-h-full">
            <div className="overflow-y-auto p-6 flex-grow">
              <h2 className="text-xl font-bold mb-4">Edit Event</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Route Length (km)</label>
                <input
                  type="number"
                  name="route_length"
                  value={formData.route_length}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ride Pace (km/h)</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.ride_pace}
                  name="ride_pace"
                  onChange={handleChange}
                >
                  <option value="">Select a ride pace</option>
                  {RidePace.map((pace) => (
                    <option key={pace} value={pace}>
                      {pace}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Area</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.area}
                  onChange={handleChange}
                  name="area"
                >
                  <option value="">Select an area</option>
                  {RideAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Time</label>
                <input
                  type="datetime-local"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={10}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Event Leader Name</label>
                <input
                  type="text"
                  name="event_leader_name"
                  value={formData.event_leader_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="p-6 bg-gray-100 flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditButton;
