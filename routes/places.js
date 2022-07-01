const express = require("express");

const placesControllers = require("../controllers/places");

const router = express.Router();

router.get("/:id", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlaceByUserId);

module.exports = router;
