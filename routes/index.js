var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.models");
const { validate } = require("express-validation");
const userValidation = require("../validation/user.validation");
/* GET home page. */
router.get("/", function (req, res, next) {
  User.find().then((data) => {
    if (data) {
      return res.json(data);
    }
  });
});
router.get(
  "/:userId",
  validate(userValidation.getUser),
  function (req, res, next) {
    const { userId } = req.params;
    User.find({ _id: userId }).then((data) => {
      if (data) {
        return res.json(data);
      }
    });
  }
);

// router.post('/', validate(userValidation.createUser, {}, {}), function (req, res, next) {
//   const {email} = req.body;
//   // Mongoose Model.findOne()
//   User.findOne({email: email}, function (err, email) {
//       console.log("email", email)
//       if (email) {
//           return res.status(400).send({msg: 'Email already exists'});
//       } else {
//           return new User(req.body).save().then(data => res.json(data)).catch(error => next(error));
//       }
//   })

//return new User(req.body).save().then(data=>res.json(data)).catch(error=>next(error));
// res.json({msg:'respond with a resource'});
// });
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
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());

router.put(
  "/:userId",
  validate(userValidation.updateUser),
  async function (req, res) {
    const { userId } = req.params;
    // const { name, age, email } = req.body;
    User.findByIdAndUpdate(userId, { $set: req.body }, function (err, data) {
      if (data) {
        return res.json(data);

        // return res.json(data);
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
