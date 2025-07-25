const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mood: {
        type: String,
        required: [true, 'Mood is required'],
        enum: ['happy', 'neutral', 'sad', 'anxious', 'angry', 'excited', 'overwhelmed', 'calm']
    },
    emoji: {
        type: String,
        required: true
    },
    intensity: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    triggers: [{
        type: String,
        trim: true
    }],
    activities: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

// Index for efficient queries
moodEntrySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('MoodEntry', moodEntrySchema);