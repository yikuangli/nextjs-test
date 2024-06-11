import { fetchEvents } from '@/app/lib/query';
import Link from 'next/link';
import React from 'react';
import DeleteButton from './DeleteButton';

export default async function EventList({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: number;
}) {
  const events = await fetchEvents();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {events?.map((event) => (
              <Link key={event.id} href={`/${event.id}/activity`} passHref>
                <div className="block mb-2 w-full rounded-md bg-white p-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{event.title}</p>
                      </div>
                      <p className="text-sm text-gray-500">{event.ride_type}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{event.route_length} km</p>
                      <p>{event.location}</p>
                      <p>{new Date(event.time).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-6 gap-4 text-left text-sm font-normal bg-gray-100 p-2">
              <div className="px-4 py-5 font-medium sm:pl-6">Title</div>
              <div className="px-3 py-5 font-medium">Route Length (km)</div>
              <div className="px-3 py-5 font-medium">Ride Pace (km/h)</div>
              <div className="px-3 py-5 font-medium">Area</div>
              <div className="px-3 py-5 font-medium">Time</div>
              <div className="px-2 py-3 font-medium">Actions</div>
            </div>
            {events?.map((event) => (
              <div key={event.id} className="grid grid-cols-2 gap-4 border-b py-2 text-sm mb-2 w-full bg-white p-2 rounded-md hover:bg-gray-100"  style={{ gridTemplateColumns: '5fr 1fr' }}>
                <Link href={`/${event.id}/activity`} passHref>
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="whitespace-nowrap py-2 pl-3 pr-2">
                      <p>{event.title}</p>
                    </div>
                    <div className="whitespace-nowrap px-2 py-2">{event.route_length}</div>
                    <div className="whitespace-nowrap px-2 py-2">{event.ride_pace}</div>
                    <div className="whitespace-nowrap px-2 py-2">{event.area}</div>
                    <div className="whitespace-nowrap px-2 py-2">
                      {new Date(event.time).toLocaleString()}
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-center">
                  <DeleteButton eventId={event.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
