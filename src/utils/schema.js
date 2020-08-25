import Joi from 'joi-browser';

const signInSchema = {
  username: Joi.string().required().label('Username'),
  password: Joi.string().required().label('Password'),
};

const userCreateSchema = {
  _id: Joi.string().label('ID'),
  email: Joi.string().email().required().label('Email'),
  fullname: Joi.string().required().label('Full Name'),
  username: Joi.string().required().label('Username'),
  password: Joi.string().required().label('Password'),
};

export { signInSchema, userCreateSchema };
