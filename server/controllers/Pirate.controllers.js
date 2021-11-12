// FULL CRUD
const Pirate = require("../models/Pirate")

module.exports = {

    // READ ALL ---------------------------
    findAll: (req, res) => {
        //sorting by ascending alpha on title
        Pirate.find().sort({name: 1})
            .then(allPirates => res.json(allPirates))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // READ ONE ---------------------------
    findOne: (req, res) => {
        Pirate.findById(req.params.id)
            .then(pirate => res.json(pirate))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // CREATE -----------------------------
    create: (req, res) => {
        // const {title, content, isImportant} = req.body
        Pirate.create(req.body)
            .then(newPirate => res.json(newPirate))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // UPDATE -----------------------------
    update: (req, res) => {
        Pirate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(updatedPirate => res.json(updatedPirate))
            .catch(err => res.status(400).json({ message: "error", error: err }))
    },

    // DELETE -----------------------------
    delete: (req, res) => {
        Pirate.findByIdAndDelete(req.params.id)
            .then( result => res.json({result: result}))
            .catch( err => res.status(400).json({err: err}))
    }
}