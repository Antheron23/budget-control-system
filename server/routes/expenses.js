const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the middleware
const Expense = require('../models/Expense');

router.get('/', auth, async (req, res) => {
    try {
        // Find expenses where user matches the logged-in ID
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    const { title, amount, category, notes } = req.body;

    try {
        const newExpense = new Expense({
            title,
            amount,
            category,
            notes,
            user: req.user.id // Attach the user ID from the token
        });

        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        // 1. Find the expense by ID
        // req.params.id comes from the URL (e.g. /api/expenses/12345)
        let expense = await Expense.findById(req.params.id);

        // 2. Check if expense exists
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        // 3. Security Check: Ensure user owns this expense
        // We compare the expense's user ID with the logged-in user's ID
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // 4. Delete it
        await Expense.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;