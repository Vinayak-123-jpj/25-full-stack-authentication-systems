import mongoose from 'mongoose';

// Singleton pattern — prevent multiple connections in Next.js dev mode due to hot reload
let isConnected = false;

export async function connect() {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI!);
        isConnected = db.connections[0].readyState === 1;

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        })

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}