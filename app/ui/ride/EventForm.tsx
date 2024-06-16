'use client';
import { createEvent } from '@/app/lib/actions';
import React, { useState } from 'react';


const areas = [
  'Downtown',
  'North York',
  'Markham',
  'Oakville',
  'Richmond Hill',
  'Mississauga'
];

const ridePaces = ['<=20', '20-25', '25-30', '30+'];

const EventFormComponent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [area, setArea] = useState('');
  const [routeUrl, setRouteUrl] = useState("");
  const [location, setLocation] = useState('');
  const [routeLength, setRouteLength] = useState('');
  const [ridePace, setRidePace] = useState('');
  const [eventLeaderName, setEventLeaderName] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('eventTime', eventTime);
    formData.append('area', area);
    formData.append('routeUrl', routeUrl);
    formData.append("routeLength", routeLength)
    formData.append('location', location);
    formData.append('ridePace', ridePace);
    formData.append('eventLeaderName', eventLeaderName);
    formData.append('passphrase', passphrase);

    const result = await createEvent(formData);
    if (result?.errors) {
      setErrors(result.errors);
    } else {
      // Handle successful event creation (e.g., show a success message or redirect)
    }
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
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
          {errors.eventTime && <p className="text-red-500 text-sm">{errors.eventTime}</p>}
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
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Route URL</label>
          <input
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            value={routeUrl}
            onChange={(e) => setRouteUrl(e.target.value)}
          />
          {errors.routeUrl && <p className="text-red-500 text-sm">{errors.routeUrl}</p>}
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
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Route Length</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={routeLength}
            onChange={(e) => setRouteLength(e.target.value)}
            required
          />
          {errors.routeLength && <p className="text-red-500 text-sm">{errors.routeLength}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ride Pace</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={ridePace}
            onChange={(e) => setRidePace(e.target.value)}
          >
            <option value="">Select a ride pace</option>
            {ridePaces.map((pace) => (
              <option key={pace} value={pace}>
                {pace}
              </option>
            ))}
          </select>
          {errors.ridePace && <p className="text-red-500 text-sm">{errors.ridePace}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            required
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Event Leader Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={eventLeaderName}
            onChange={(e) => setEventLeaderName(e.target.value)}
            required
          />
          {errors.eventLeaderName && <p className="text-red-500 text-sm">{errors.eventLeaderName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Passphrase</label> 
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            
          />
          {errors.passphrase && <p className="text-red-500 text-sm">{errors.passphrase}</p>}
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
