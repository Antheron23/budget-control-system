import mongoose, { Document, Schema } from 'mongoose';

// 1.(Defines the shape for TypeScript)
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

// 2.(Defines the shape for MongoDB)
const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

// 3. EXPORT
export default mongoose.model<IUser>('User', UserSchema);