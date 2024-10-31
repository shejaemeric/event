import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./header";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div>
      <Header />
      <h1>Upcoming Events</h1>
      {events.map((event) => (
        <div key={event._id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Seats Available: {event.availableSeats}</p>
          <Link href={`/events/${event._id}`}>View Details & Book</Link>
        </div>
      ))}
    </div>
  );
}
