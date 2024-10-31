import { useState, useEffect } from "react";
import Header from "../header";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    await fetch("/api/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, date, availableSeats: seats }),
    });
    setTitle("");
    setDescription("");
    setDate("");
    setSeats("");
  };

  return (
    <div>
      <Header />
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          placeholder="Seats"
        />
        <button type="submit">Add Event</button>
      </form>

      <h2>Current Events</h2>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}
