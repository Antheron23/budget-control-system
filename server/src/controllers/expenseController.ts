import { Request, Response } from 'express';
import Expense from '../models/Expense';

// We tell TS:This request has a user object attached to it
interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}

// GET /api/expenses
export const getExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Validation: Ensure user exists
        if (!req.user) {
            res.status(401).json({ msg: 'Authorization denied' });
            return;
        }

        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

// POST /api/expenses
export const addExpense = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, amount, category, notes } = req.body;

    try {
        if (!req.user) {
            res.status(401).json({ msg: 'Authorization denied' });
            return;
        }

        const newExpense = new Expense({
            title,
            amount,
            category,
            notes,
            user: req.user.id // Now TS knows this exists!
        });

        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

// DELETE /api/expenses/:id
export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ msg: 'Authorization denied' });
            return;
        }

        let expense = await Expense.findById(req.params.id);

        if (!expense) {
            res.status(404).json({ msg: 'Expense not found' });
            return;
        }

        // Security Check: Ensure user owns this expense
        // We use .toString() because MongoDB ObjectIds are objects, not strings
        if (expense.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'User not authorized' });
            return;
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};