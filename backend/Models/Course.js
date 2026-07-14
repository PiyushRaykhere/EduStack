import mongoose from "mongoose";

let CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster:{
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number
    },
    category: {
        type: String,
        required: true,
        default: "General"
    },
    instructor: {
        type: String,
        required: true,
        default: "Expert Instructor"
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
        default: "All Levels"
    },
    description: {
        type: String,
        required: true
    },
    curriculum: [{
        title: { type: String, required: true },
        lectures: [{
            title: { type: String, required: true },
            duration: { type: String, required: true }
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

})

export default mongoose.model('Course', CourseSchema);