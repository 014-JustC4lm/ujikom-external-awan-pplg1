import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import itemRoutes from './routes/item.routes.js';
import loanRoutes from './routes/loan.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/loans', loanRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ msg: 'Lumixor Studio API is running', code: 200 });
});

export default app;