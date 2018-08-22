import Joi from 'joi';

export const validateCreateUser = {
  body: {
    username: Joi.string().required(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
    email: Joi.string().email()
  }
};

export const validateUpdateUser = {
  body: {
    username: Joi.string().required(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
  },
  params: {
    userId: Joi.string().hex().required()
  }
};

export const validateLogin = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required()
  }
};
