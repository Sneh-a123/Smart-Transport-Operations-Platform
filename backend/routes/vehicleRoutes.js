const express = require("express");

const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

router.post("/", vehicleController.addVehicle);

router.get("/", vehicleController.getVehicles);

module.exports = router;