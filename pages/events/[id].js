import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then((res) => res.json())
        .then((data) => setEvent(data));
    }
  }, [id]);

  const handleBooking = async () => {
    await fetch("/api/events/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: id }),
    });
    alert("Booking successful!");
    router.reload();
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Seats Available: {event.availableSeats}</p>
      {event.availableSeats > 0 ? (
        <button onClick={handleBooking}>Book Now</button>
      ) : (
        <p>No seats available</p>
      )}
    </div>
  );
}
