const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

router.get("/", vehicleController.getVehicles);
router.post("/", vehicleController.addVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;