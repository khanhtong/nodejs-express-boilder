import Joi from 'joi';

export const validateCreateUser = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^.{6,}$/).required()
  }
};

export const validateUpdateUser = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^.{6,}$/).required()
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
