var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.models");
const { validate } = require("express-validation");
const userValidation = require("../validation/user.validation");
const mongoosePaginate = require("mongoose-paginate-v2");
const paginate = require("jw-paginate");
const searchedUsers = [];
/* GET home page. */
router.get("/users", function (req, res, next) {
  User.find().then((data) => {
    if (data) {
      return res.json(data);
    }
  });
});
router.get("/users/search/:searchTerm", function (req, res, next) {
  const { searchTerm } = req.params;
  const { offset } = req.query;
  User.find().then((data) => {
    if (data) {
      const limit = 5;
      const searchUser = data.filter((item) => {
        const regexp = searchTerm;
        const matches_array = item.name
          .toLowerCase()
          .match(regexp.toLowerCase());
        return matches_array;
      });
      const indexOfLastTodo = offset * limit;
      const indexOfFirstTodo = indexOfLastTodo - limit;
      const slice = searchUser.slice(indexOfFirstTodo, indexOfLastTodo);
      const totalPages = Math.ceil(searchUser.length / limit);
      return res.json({ slice, totalPages });
    }
  });
});
router.get("/", function (req, res, next) {
  const { offset, limit } = req.query;
  User.find()
    .then((data) => {
      const indexOfLastTodo = offset * limit;
      const indexOfFirstTodo = indexOfLastTodo - limit;
      const page = Math.ceil(data.length / limit);
      const slice = data.slice(indexOfFirstTodo, indexOfLastTodo);
      return res.json({ slice, page });
    })
    .catch((error) => res.json(error));
});
router.get(
  "/:userId",
  validate(userValidation.getUser),
  function (req, res, next) {
    const { userId } = req.params;
    User.find({ _id: userId })
      .then((data) => {
        return res.json(data);
      })
      .catch((error) => res.json(error));
  }
);
router.post(
  "/",
  validate(userValidation.createuser),
  function (req, res, next) {
    const { email } = req.body;
    User.findOne({ email: email }).then((data) => {
      if (data) {
        return res.status(400).json({ msg: "Email already exist" });
      } else {
        return User(req.body)
          .save()
          .then((data) => res.json(data));
      }
    });
  }
);
router.put(
  "/:userId",
  validate(userValidation.updateUser),
  async function (req, res) {
    const { userId } = req.params;
    User.findByIdAndUpdate(userId, { $set: req.body }, function (err, data) {
      if (data) {
        return res.json(data);
      }
    });
  }
);
router.delete(
  "/:userId",
  validate(userValidation.deleteUser),
  function (req, res) {
    const { userId } = req.params;
    User.findOneAndRemove({ _id: userId }, function (err, data) {
      if (data) {
        return res.json(data);
      } else {
        return res.status(400).send({ msg: "User is not exist" });
      }
    });
  }
);
module.exports = router;
