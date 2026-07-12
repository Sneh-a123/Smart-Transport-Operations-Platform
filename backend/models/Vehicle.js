const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reg: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: Number,
    insurance: String,
    fitness: String,
    notes: String,
    status: {
        type: String,
        default: "Available"
    },
    driver: {
        type: String,
        default: "-"
    }
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);