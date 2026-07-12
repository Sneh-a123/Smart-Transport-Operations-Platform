const Vehicle = require("../models/Vehicle");

// Add Vehicle
exports.addVehicle = async (req, res) => {
    try {

        const vehicle = await Vehicle.create(req.body);

        res.status(201).json(vehicle);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// Get All Vehicles
exports.getVehicles = async (req, res) => {

    try {

        const vehicles = await Vehicle.find();

        res.json(vehicles);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};