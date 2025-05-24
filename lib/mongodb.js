import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://shashwatrajwanshi41:8E6OloWIS1x75UvD@clustergym.4ilsnlo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGYM";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
