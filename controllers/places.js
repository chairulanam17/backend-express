const uuid = require("uuid").v4;

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const getCoordForAdrress = require("../util/location");

let DUMMY_PLACES = [
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
    throw new HttpError("Tempat dengan id tersebut tidak ditemukan", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Tempat yang disediakan oleh user tidak ditemukan", 404)
    );
  }
  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Input tidak sesuai", 422));
  }
  const { title, description, address, creator } = req.body;

  //
  let coordinates;
  try {
    coordinates = await getCoordForAdrress(address);
  } catch (error) {
    // return res.status(404).json({ error: error.message });
    return res.status(422).json({ error: "Alamat spesifik tidak ditemukan." });
    // return next(error);
  }

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Input tidak sesuai", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.id;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.id;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("ID tempat tersebut tidak ditemukan", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
