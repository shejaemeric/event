import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await connectToDatabase();
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
}
