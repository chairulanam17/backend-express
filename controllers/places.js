const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  // console.log("GET Request in Places");
  const placeId = req.params.id;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError(
      "Tempat yang disediakan oleh user tidak ditemukan",
      404
    );
  }

  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Tempat yang disediakan oleh user tidak ditemukan", 404)
    );
  }
  res.json({ place });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
