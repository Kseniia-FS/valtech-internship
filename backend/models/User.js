const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    name: String,
    adress: String,
    phone: String,
    token: { type: String, default: null },
    bonus: { type: Number, default: 0 },
}, { versionKey: false, timestamps: true });

const User = model("user", userSchema);

module.exports = User;