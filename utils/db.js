import pkg from 'mongoose';
const { connect, connection } = pkg;
import { config } from 'dotenv';

config()

export const connectToDatabase = async () => {
    await connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    let db = connection
    return db

}

