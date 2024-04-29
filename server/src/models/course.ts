import mongoose, { Schema } from 'mongoose';

export interface CourseSchema {
    id?: string | undefined;
    title: String;
    description: string;
    price: number;
    instructor?: mongoose.Types.ObjectId | undefined;
    students: string[];
}

const courseSchema: mongoose.Schema<CourseSchema> = new Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    students: {
        type: [String],
        default: [],
    },
});

export default mongoose.model('Course', courseSchema);
