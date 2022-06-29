const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Monas",
    description: "Monumen Nasional di Ibu Kota Jakarta",
    location: {
      lat: -6.1753871,
      lng: 106.8249641,
    },
    address:
      "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    creator: "u1",
  },
];

router.get("/:id", (req, res, next) => {
  // console.log("GET Request in Places");
  const placeId = req.params.id;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  res.json({ place });
});

module.exports = router;
