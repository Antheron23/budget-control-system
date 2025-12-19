import express from 'express';
import { getExpenses, addExpense, deleteExpense } from '../controllers/expenseController';

const router = express.Router();

import auth from '../middleware/auth';
// Route: GET /api/expenses
router.get('/', auth, getExpenses);

// Route: POST /api/expenses
router.post('/', auth, addExpense);

// Route: DELETE /api/expenses/:id
router.delete('/:id', auth, deleteExpense);

export default router;