"use client"
import { fetchEvents } from '@/app/lib/query';
import Link from 'next/link';
import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditActivity';
import { TActivity } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';
import FilterBar from './filterbar';

export default  function EventList({
	events,
}:{
	events: TActivity[]
}) {
	// const query = searchParams?.area || '';
	// console.log(searchParams)
	// const events = await fetchEvents();
	// const events = await fetchEvents({ time: time || undefined, area: area || undefined });

	// Sort events by time
	const sortedEvents = events.sort((a: TActivity, b: TActivity) => new Date(a.time).getTime() - new Date(b.time).getTime());

	// Get current time
	const now = new Date().getTime();

	return (
		<div className="mt-6 flow-root">
			
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{sortedEvents?.map((event) => (
							<div key={event.id} className={`block mb-2 w-full rounded-md bg-white p-4 ${new Date(event.time).getTime() < now ? 'bg-gray-300' : ''}`}>
								<Link href={`/${event.id}/activity`} passHref>
									<div>
										<div className="flex items-center justify-between border-b pb-4">
											<div>
												<div className="mb-2 flex items-center">
													<p>{event.title}</p>
												</div>
											</div>
										</div>
										<div className="flex w-full items-center justify-between pt-4">
											<div>
												<p className="text-xl font-medium">{event.route_length} km</p>
												<p>{event.location}</p>
												<p>{new Date(event.time).toLocaleString()}</p>
												<p>Total Participants: {event.users_joined ? event.users_joined.length : 0}</p>
											</div>
										</div>
									</div>
								</Link>
								<div className="flex items-center justify-end space-x-2 mt-2">
									<EditButton event={event} />
									<DeleteButton eventId={event.id} />
								</div>
							</div>
						))}
					</div>
					<div className="hidden md:block">
						<div className="grid grid-cols-7 gap-4 text-left text-sm font-normal bg-gray-100 p-2">
							<div className="px-4 py-5 font-medium sm:pl-6">Title</div>
							<div className="px-3 py-5 font-medium">Route Length (km)</div>
							<div className="px-3 py-5 font-medium">Ride Pace (km/h)</div>
							<div className="px-3 py-5 font-medium">Area</div>
							<div className="px-3 py-5 font-medium">Time</div>
							<div className="px-3 py-5 font-medium">Total Participants</div>
							<div className="px-2 py-3 font-medium text-center">Actions</div>
						</div>
						{sortedEvents?.map((event: TActivity) => (
							<div key={event.id} className={`grid grid-cols-2 gap-4 border-b py-2 text-sm mb-2 w-full p-2 rounded-md hover:bg-gray-100 ${new Date(event.time).getTime() < now ? 'bg-gray-300' : 'bg-white'}`} style={{ gridTemplateColumns: '6fr 1fr' }}>
								<Link href={`/${event.id}/activity`} passHref>
									<div className="grid grid-cols-6 gap-4 items-center">
										<div className="whitespace-nowrap py-2 pl-3 pr-2">
											<p>{event.title}</p>
										</div>
										<div className="whitespace-nowrap px-2 py-2">{event.route_length}</div>
										<div className="whitespace-nowrap px-2 py-2">{event.ride_pace}</div>
										<div className="whitespace-nowrap px-2 py-2">{event.area}</div>
										<div className="whitespace-nowrap px-2 py-2">
											{new Date(event.time).toLocaleString()}
										</div>
										<div className="whitespace-nowrap px-2 py-2"> {event.users_joined ? event.users_joined.length : 0}</div>
									</div>
								</Link>
								<div className="grid grid-cols-2 items-center justify-center ">
									<div className="whitespace-nowrap px-2 py-2  items-center justify-center text-center" > <EditButton event={event} /></div>
									<div className="whitespace-nowrap px-2 py-2  items-center justify-center text-center">   <DeleteButton eventId={event.id} /><div />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
