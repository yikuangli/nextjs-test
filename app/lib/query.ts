import { sql } from '@vercel/postgres';

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
  