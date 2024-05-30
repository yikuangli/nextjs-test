import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { addUserToEvent, fetchEventById } from '@/app/lib/query';
import Head from 'next/head';
import React, { useState } from 'react';
import SignUpComponent from '@/app/ui/ride/sign-up-popup';

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const event = await fetchEventById(id);
	console.log(event?.users_joined);
	if (!event) {
		notFound();
	}
	const formatDescription = (description: string) => {
		return description.split('\n').map((item, index) => (
			<span key={index}>
				{item}
				<br />
			</span>
		));
	};
	return (
		<main>
			<div className="bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
				<Head>
					<title>{event.title} - Event Details</title>
				</Head>
				<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
					<h1 className="text-3xl font-bold mb-4 text-gray-800">{event.title}</h1>
					<div className="mb-2">
						<strong className="block text-gray-700">Time:</strong>
						<p className="text-gray-600">{new Date(event.time).toLocaleString()}</p>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Route URL:</strong>
						<a href={event.route_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{event.route_url}</a>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Ride Type:</strong>
						<p className="text-gray-600">{event.ride_type}</p>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Route Length:</strong>
						<p className="text-gray-600">{event.route_length} km</p>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Location:</strong>
						<p className="text-gray-600">{event.location}</p>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Start Point Address:</strong>
						<p className="text-gray-600">{event.start_point_address}</p>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Ride Pace:</strong>
						<p className="text-gray-600">{event.ride_pace}</p>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Area:</strong>
						<p className="text-gray-600">{event.area}</p>
					</div>
					<div className="mb-2">
						<strong className="block text-gray-700">Event Leader:</strong>
						<p className="text-gray-600">{event.event_leader_name}</p>
					</div>

					<div className="mb-2">
						<strong className="block text-gray-700">Description:</strong>
						<p className="text-gray-600">{formatDescription(event.description)}</p>
					</div>

					{event.users_joined && (
						<div className="mb-2">
							<strong className="block text-gray-700">Attendees:</strong>
							<ul className="list-disc list-inside text-gray-600">
								{(event.users_joined as string[]).map((user, index) => (
									<li key={index}>{user}</li>
								))}
							</ul>
						</div>
					)}


					<SignUpComponent eventId={id}  />
				</div>
			</div>
		</main>
	);
}