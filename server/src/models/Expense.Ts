import mongoose, { Document, Schema, Types } from 'mongoose';

// 1. THE INTERFACE
export interface IExpense extends Document {
    user: Types.ObjectId; // <--- Special Type for MongoDB IDs
    title: string;
    amount: number;
    category: string;
    date: Date;
    notes?: string;       // <--- The '?' means this field is optional
}

// 2. THE SCHEMA
const ExpenseSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // Connects to another table
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, {
    timestamps: true // Adds createdAt/updatedAt automatically
});

// 3. EXPORT
export default mongoose.model<IExpense>('Expense', ExpenseSchema);