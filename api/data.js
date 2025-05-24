import { connectToDatabase } from '../../lib/mongodb';
import Entry from '../../models/Entry';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectToDatabase(); // Ensure DB is connected

  if (req.method === 'POST') {
    const { id, name, currentTime } = req.body;

    if (!id || !name || !currentTime) {
      return res.status(400).json({ message: "Missing id, name or currentTime" });
    }

    const newEntry = await Entry.create({ id, name, currentTime, extraData: [] });
    return res.status(200).json({ message: "Data saved successfully", entry: newEntry });
  }

  if (req.method === 'GET') {
    const entries = await Entry.find();
    return res.status(200).json(entries);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
