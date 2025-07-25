const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        trim: true,
        maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        enum: ['web-development', 'hr-intern', 'product-management', 'data-science', 'marketing']
    },
    experience: {
        type: String,
        enum: ['fresher', 'junior', 'intermediate', 'senior'],
        default: 'fresher'
    },
    education: {
        degree: String,
        institution: String,
        graduationYear: Number
    },
    skills: [{
        type: String,
        trim: true
    }],
    coverLetter: {
        type: String,
        maxlength: [1000, 'Cover letter cannot exceed 1000 characters']
    },
    resumeUrl: {
        type: String
    },
    portfolioUrl: {
        type: String
    },
    availableStartDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'interview', 'accepted', 'rejected'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
        maxlength: [500, 'Admin notes cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('InternshipApplication', internshipApplicationSchema);