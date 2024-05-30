export interface RideEvent {
    id: string;
    title: string;
    time: string;
    description: string;
    route_url: string;
    ride_type: string;
    route_length: number;
    location: string;
    start_point_address: string;
    ride_pace: string;
    area: string;
    event_leader_name: string;
    users_joined: string[];
  }