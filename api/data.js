let dataStore = [];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method === 'POST') {
    const { id, name, currentTime } = req.body;

    if (!id || !name || !currentTime) {
      return res.status(400).json({ message: "Missing id, name or currentTime" });
    }

    const newEntry = {
      id,
      name,
      currentTime,
      extraData: []
    };

    dataStore.push(newEntry);
    return res.status(200).json({ message: "Data appended successfully", entry: newEntry });

  } else if (req.method === 'GET') {
    return res.status(200).json(dataStore);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
