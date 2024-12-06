import app from './app.js';
import { connectDB } from './db.js';
import dotenv from "dotenv";

dotenv.config();

connectDB()

const PORT = process.env.PORT
app.listen(PORT)
console.log('Server runnning on port ',PORT);