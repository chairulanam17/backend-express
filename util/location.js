const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "pk.15b352666bac49ee5bd4be7d54f98ad0";

async function getCoordForAdrress(address) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );
  const data = response.data[0];

  //   if (!data || data.status == "unable to geocode") {
  //     const error = new HttpError("Alamat spesifik tidak ditemukan.", 422);
  //     throw error;
  //   }

  const coorLat = data.lat;
  const coorLon = data.lon;
  const coordinates = {
    lat: coorLat,
    lng: coorLon,
  };

  return coordinates;
}

module.exports = getCoordForAdrress;
