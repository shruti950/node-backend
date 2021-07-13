var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.models");
/* GET home page. */
router.get("/", function (req, res, next) {
  User.find().then((data) => {
    if (data) {
      return res.json(data);
    }
  });
});
router.get("/:userId", function (req, res, next) {
  const { userId } = req.params;
  User.find({ _id: userId }).then((data) => {
    if (data) {
      return res.json(data);
    }
  });
});
router.post("/", function (req, res, next) {
  return User(req.body)
    .save()
    .then((data) => res.json(data));
});
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());

router.put("/:userId", async function (req, res) {
  const { userId } = req.params;
  const { name, age } = req.body;
  User.findByIdAndUpdate(
    { _id: userId },
    { $set: { name: name, age: age } },
    function (err, data) {
      if (data) {
        User.find({ _id: userId }).then((data) => {
          return res.json(data);
        });
        return res.json(data);
      }
    }
  );
});

router.delete("/:userId", function (req, res) {
  const { userId } = req.params;
  User.findOneAndRemove({ _id: userId }, function (err, data) {
    if (data) {
      return res.json(data);
    } else {
      return res.status(400).send({ msg: "User is not exist" });
    }
  });
});
module.exports = router;
