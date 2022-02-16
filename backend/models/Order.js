const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const order = new Schema({

    orderNumber: Number,
    products: Array,
    totalSum: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { versionKey: false, timestamps: true });

const Order = model("contact", order);

module.exports = Order;