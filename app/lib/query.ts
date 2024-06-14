'use server';
import { sql } from '@vercel/postgres';
import { RideEvent } from './types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { TActivity } from './definitions';

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


export async function fetchEvents(): Promise<Array<TActivity>> {
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
          ride_pace,
          area,
          organization_id,
          users_joined
        FROM event
      
        ORDER BY time ASC
      `;

        const events = data.rows as TActivity[];
        return events;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch events.`);
    }
}

export async function validatePassphrase(eventId: string, passphrase: string) {
    const data = await sql`
  SELECT passphrase FROM event WHERE id = ${eventId}
`;
    const events = data.rows;
    console.log(passphrase)
    console.log(events[0].passphrase)
    if (!events[0].passphrase && (passphrase.length === 0 || !passphrase)) {
        return true;
    }
    if (events.length === 0 || events[0].passphrase !== passphrase) {
        return false;
    }

    return true;
}


export async function deleteEvent(eventId: string, passphrase: string) {
    // Verify the passphrase before deleting
    const data = await sql`
    SELECT passphrase FROM event WHERE id = ${eventId}
  `;
    const events = data.rows;
    console.log(events[0])
    // console.log(events[0].passphrase)
    console.log(passphrase)
    if (!events[0].passphrase && passphrase.length === 0) {
        await sql`
    DELETE FROM event WHERE id = ${eventId}
  `;
        return
    }
    if (events.length === 0 || events[0].passphrase !== passphrase) {
        throw new Error('Invalid passphrase');
    }

    await sql`
    DELETE FROM event WHERE id = ${eventId}
  `;
}

export async function updateEvent(eventId: string, data: any) {
    const { title, route_length, ride_pace, area, time, description, location, start_point_address, event_leader_name } = data;

    await sql`
    UPDATE event
    SET
      title = ${title},
      route_length = ${route_length},
      ride_pace = ${ride_pace},
      area = ${area},
      time = ${time},
      description = ${description},
      location = ${location},
      start_point_address = ${start_point_address},
      event_leader_name = ${event_leader_name}
    WHERE id = ${eventId}
  `;

    let link = `/`
    revalidatePath(link);
    redirect(link);
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