const { Pool, db } = require('@vercel/postgres');



const createTables = async (client) => {
    //   const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Create the organization table
        await client.query(`
      CREATE TABLE IF NOT EXISTS organization (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );
    `);

        // Create the event table
        await client.query(`
      CREATE TABLE IF NOT EXISTS event (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        time TIMESTAMP NOT NULL,
        description TEXT,
        route_url VARCHAR(255),
        ride_type VARCHAR(50),
        route_length FLOAT,
        location VARCHAR(255),
        organization_id INTEGER REFERENCES organization(id),
        users_joined TEXT[]
      );
    `);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const insertFakeData = async () => {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        // Insert fake data into organization table
        const orgResult = await client.query(`
      INSERT INTO organization (name, description)
      VALUES 
      ('Cycling Club', 'A club for cycling enthusiasts'),
      ('Mountain Bikers', 'A group for mountain biking lovers')
      RETURNING id;
    `);

        const organizationIds = orgResult.rows.map(row => row.id);

        // Insert fake data into event table
        await client.query(`
      INSERT INTO event (title, time, description, route_url, ride_type, route_length, organization_id, users_joined)
      VALUES 
      ('Morning Ride', '2024-06-01 08:00:00', 'A relaxing morning ride', 'http://example.com/route1', 'Road', 25.5, ${organizationIds[0]}, ARRAY['user1', 'user2']),
      ('Mountain Adventure', '2024-06-02 09:00:00', 'An adventurous mountain biking event', 'http://example.com/route2', 'Mountain', 35.0, ${organizationIds[1]}, ARRAY['user3', 'user4']);
    `);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const main = async () => {
    try {
        // const client = await db.connect();
        // await createTables(client);
        // console.log('Tables created successfully.');
        // await insertFakeData();
        // console.log('Fake data inserted successfully.');
        await modifyEventTable()
    } catch (err) {
        console.error('Error executing script:', err);
    }
};

const modifyEventTable = async () => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        // Alter the event table
        await client.query(`
        ALTER TABLE event
        ADD COLUMN start_point_address VARCHAR(255),
        ADD COLUMN ride_pace VARCHAR(50),
        ADD COLUMN area VARCHAR(100),
        ADD COLUMN event_leader_name VARCHAR(100),
        ADD COLUMN passphrase VARCHAR(100);
      `);

        // Insert test data
        await client.query(`
        INSERT INTO event (title, time, description, route_url, ride_type, route_length, location, organization_id, users_joined, start_point_address, ride_pace, area, event_leader_name, passphrase)
        VALUES 
        ('Morning Ride', '2024-06-01 07:30:00', 'A fun morning ride', 'http://routeurl.com/1', 'Road', 25.5, 'Central Park', 1, '{"user1", "user2"}', '123 Main St', 'Moderate', 'Downtown', 'John Doe', 'morning123'),
        ('Evening Cruise', '2024-06-02 18:00:00', 'Relaxed evening ride', 'http://routeurl.com/2', 'Mountain', 30.0, 'Riverside', 1, '{"user3", "user4"}', '456 Elm St', 'Leisurely', 'Uptown', 'Jane Smith', 'evening456');
      `);

        console.log('Table altered and test data inserted successfully.');
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

main();
