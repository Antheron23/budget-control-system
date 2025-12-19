import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
// Note: These might show red lines until we convert the route files to TS next!
import authRoutes from './routes/auth'; 
import expenseRoutes from './routes/expenses';

dotenv.config();
const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// 2. Type Safety for Environment Variables
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file");
  process.exit(1); // Stop the app if DB string is missing
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});