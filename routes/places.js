const express = require("express");

const placesControllers = require("../controllers/places");

const router = express.Router();

router.get("/:id", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlaceByUserId);

router.post("/", placesControllers.createPlace);

router.patch("/:id", placesControllers.updatePlace);

router.delete("/:id", placesControllers.deletePlace);

// router.delete("/:id", placesControllers.deletePlace);

module.exports = router;
