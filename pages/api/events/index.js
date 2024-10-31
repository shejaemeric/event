import connectToDatabase from "../../../lib/mongodb";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  await connectToDatabase();
  const events = await Event.find();
  res.status(200).json(events);
}
