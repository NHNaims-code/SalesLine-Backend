import mongoose from "mongoose";

// String type & required
const StringRequired = {
    type: String,
    required: true
}

// Number type & required
const NumberRequired = {
    type: Number,
    required: true
}

//User Schema
const UserSchema = new mongoose.Schema({
    username: { // name means first name and last name
        type: String,
        required: true,
        trim: true,
    },
    organisation: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date_time: {
        type: Date,
        default: new Date()
    },
    token: { // Track jwt token
        type: String,
        index: true
    },
    
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password,
                delete ret.__v,
                delete ret.createdAt,
                delete ret.updatedAt
        }
    },
    timestamps: true
});

UserSchema.index({ email: 1, phone: 1 })

export default mongoose.model("User", UserSchema);