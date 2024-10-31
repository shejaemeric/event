import connectToDatabase from "../../../lib/mongodb";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  await connectToDatabase();
  const { title, description, date, availableSeats } = req.body;
  const event = new Event({ title, description, date, availableSeats });
  await event.save();
  res.status(201).json({ message: "Event created successfully" });
}
