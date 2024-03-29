const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use(
  (req, res, next) =>
    res.status(404).json({ message: "Could not find this route." })
  // {
  //   const error = new HttpError("Could not find this route.", 404);
  //   throw error;
  // }
);

app.use((error, req, res, next) => {
  // if (res.headerSent) {
  //   return next(error);
  // }
  res.status(error.code || 500);
  res.json({ message: error.message || "Error tidak diketahui terjadi!" });
});

app.listen(5001);
