const { Joi } = require("express-validation");
const userValidation = {
  createuser: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(256)
        .required(),
    }),
  },
  getUser: {
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  },
  updateUser: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(256)
        .required(),
    }),
  },
  deleteUser: {
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  },
  getUsers: {
    query: Joi.object().keys({
      page: Joi.number().default(1).required(),
      limit: Joi.number().default(5).required(),
    }),
  },
};
module.exports = userValidation;
