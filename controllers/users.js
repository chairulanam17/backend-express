const HttpError = require("../models/http-error");

const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Bang Sani",
    email: "test@test.com",
    password: "testing",
  },
  {
    id: "u2",
    name: "Bang Gabus",
    email: "bang@gabus.com",
    password: "cobacoba",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Input tidak sesuai", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Email sudah terpakai", 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "kesalahan kredential, user tidak teridentifikasi",
      401
    );
  }
  res.json({ message: "Berhasil login" });
};

module.exports = {
  getUsers,
  signup,
  login,
};
