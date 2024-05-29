import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { fetchEventById } from '@/app/lib/query';
import Head from 'next/head';

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const event = await  fetchEventById(id);

	if (!event) {
		notFound();
	}
	return (
		<main>
			{/* <Breadcrumbs
				breadcrumbs={[
					{ label: 'Invoices', href: '/dashboard/invoices' },
					{
						label: 'Edit Invoice',
						href: `/dashboard/invoices/${id}/edit`,
						active: true,
					},
				]}
			/> */}
			<div className="container mx-auto p-4">
				<Head>
					<title>{event.title} - Event Details</title>
				</Head>
				<h1 className="text-3xl font-bold mb-4">{event.title}</h1>
				<p><strong>Time:</strong> {new Date(event.time).toLocaleString()}</p>
				<p><strong>Description:</strong> {event.description}</p>
				<p><strong>Route URL:</strong> <a href={event.route_url} target="_blank" rel="noopener noreferrer">{event.route_url}</a></p>
				<p><strong>Ride Type:</strong> {event.ride_type}</p>
				<p><strong>Route Length:</strong> {event.route_length} km</p>
				<p><strong>Location:</strong> {event.location}</p>
				<p><strong>Start Point Address:</strong> {event.start_point_address}</p>
				<p><strong>Ride Pace:</strong> {event.ride_pace}</p>
				<p><strong>Area:</strong> {event.area}</p>
				<p><strong>Event Leader:</strong> {event.event_leader_name}</p>
			</div>
		</main>
	);
}