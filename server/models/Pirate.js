const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "{PATH} must be present"]
    },
    imageUrl: {
        type: String,
        required: [true, "{PATH} must be present"]
    },
    treasure: {
        type: Number,
        required: [true, "{PATH} must be present"]
    },
    phrase: {
        type: String,
        required: [true, "{PATH} must be present"]
    },
    position: {
        type: String,
        required: [true, "{PATH} must be present"]
    },
    pegLeg: {
        type: Boolean,
        default: true
    },
    eyePatch: {
        type: Boolean,
        default: true
    },
    hookHand: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

// make the note schema and export
const Pirate = mongoose.model("Pirate", PirateSchema);
module.exports = Pirate;