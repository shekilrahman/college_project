import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    dueDate: Date;
    project: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    assignedTo?: mongoose.Types.ObjectId;
    parentTask?: mongoose.Types.ObjectId;
    level: number;
    progress: number;
    weight: number;
    startedAt?: Date;
    completedAt?: Date;
    progressHistory: Array<{
        progress: number;
        timestamp: Date;
        note?: string;
    }>;
}

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    dueDate: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: null,
    },
    level: {
        type: Number,
        default: 0,
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    weight: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    startedAt: {
        type: Date,
    },
    completedAt: {
        type: Date,
    },
    progressHistory: {
        type: [{
            progress: { type: Number },
            timestamp: { type: Date, default: Date.now },
            note: { type: String },
        }],
        default: [],
    },
}, {
    timestamps: true,
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
