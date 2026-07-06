import mongoose from 'mongoose';

// Global cached connection for Vercel serverless + MongoDB Atlas
// Prevents connection exhaustion across warm lambda invocations

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

// Use a global var so the connection is cached between hot reloads in dev
// and between invocations in the same Vercel lambda instance
let cached: {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
} = (global as any)._mongooseCache;

if (!cached) {
  cached = (global as any)._mongooseCache = { conn: null, promise: null };
}

export async function connect() {
  // Return existing connection if it's open
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  // Reuse pending connection promise
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log('[MongoDB] Connected to Atlas successfully');
      return m.connection;
    }).catch((err) => {
      cached.promise = null;
      console.error('[MongoDB] Connection failed:', err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}