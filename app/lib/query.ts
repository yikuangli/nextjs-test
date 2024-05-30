'use server';
import { sql } from '@vercel/postgres';
import { RideEvent } from './types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function fetchEventsByOrganization(organizationId: string) {
	try {
		const data = await sql`
      SELECT
        id,
        title,
        time,
        description,
        route_url,
        ride_type,
        route_length,
        location,
        organization_id,
        users_joined
      FROM event
      WHERE organization_id = ${organizationId}
      ORDER BY time ASC
    `;

		const events = data.rows;
		return events;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error(`Failed to fetch events for organization ${organizationId}.`);
	}
}


export async function fetchEvents() {
	try {
		const data = await sql`
        SELECT
          id,
          title,
          time,
          description,
          route_url,
          ride_type,
          route_length,
          location,
          organization_id,
          users_joined
        FROM event
      
        ORDER BY time ASC
      `;

		const events = data.rows;
		return events;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error(`Failed to fetch events.`);
	}
}


export async function fetchEventById(id: string): Promise<RideEvent | null> {
	console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
	try {
		const data = await sql<RideEvent>`
        SELECT 
          title, 
          time, 
          description, 
          route_url, 
          ride_type, 
          route_length, 
          location, 
          start_point_address, 
          ride_pace, 
          area, 
          event_leader_name,
          users_joined
        FROM event
        WHERE id = ${id}
      `;
		return data.rows[0] || null;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to fetch event details.');
	}
}

export async function addUserToEvent(eventId: number | string, username: string) {
	console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
	try {
		await sql`
        UPDATE event
        SET users_joined = ARRAY_APPEND(users_joined, ${username})
        WHERE id = ${eventId}
      `;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to add user to event.');
	}
	let link = `/${eventId}/activity`
	revalidatePath(link);
	redirect(link);
}