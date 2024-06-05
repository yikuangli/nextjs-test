"use client"
import React, { useState } from 'react';

const areas = [
  'Downtown',
  'North York',
  'Markham',
  'Oakville',
  'Richmond Hill',
  'Mississauga',
  "Scarbrough"
];

const ridePaces = ['<=20', '20-25', '25-30', '30+'];

const EventFormComponent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [area, setArea] = useState('');
  const [routeUrl, setRouteUrl] = useState('');
  const [location, setLocation] = useState('');
  const [ridePace, setRidePace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the form submission,
    // like sending the data to your backend.
    console.log({
      title,
      description,
      eventTime,
      area,
      routeUrl,
      location,
      ridePace
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Event Time</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Area</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          >
            <option value="">Select an area</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Route URL</label>
          <input
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            value={routeUrl}
            onChange={(e) => setRouteUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ride Pace</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={ridePace}
            onChange={(e) => setRidePace(e.target.value)}
            required
          >
            <option value="">Select a ride pace</option>
            {ridePaces.map((pace) => (
              <option key={pace} value={pace}>
                {pace}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventFormComponent;
