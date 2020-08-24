import Joi from 'joi-browser';

const signInSchema = {
  email: Joi.string()
    .email()
    .required()
    .label('Email')
    .regex(/\b.+@[^].*\.[a-z]{2,}\b/),
  password: Joi.string().required().label('Password'),
};

const categoryCreateSchema = {
  name: Joi.string().required().label('Category'),
};

const categorySchema = {
  name: Joi.string().required().label('Category'),
  _id: Joi.string().required().label('Category ID'),
};

const articleSchema = {
  intro: Joi.string().required().label('Intro'),
  categoryId: Joi.string().required().label('Category ID'),
  content: Joi.string().min(5).required().label('Content'),
  featureImages: Joi.array().required().label('Feature Image'),
};

const userSchema = {
  name: Joi.string().required().label('User Name'),
  email: Joi.string().email().required().label('Email'),
  phone: Joi.string().required().label('Phone'),
  password: Joi.string().required().label('Password'),
  _id: Joi.string().required().label('user ID'),
};

const userCreateSchema = {
  name: Joi.string().required().label('User Name'),
  email: Joi.string().email().required().label('Email'),
  phone: Joi.string().required().label('Phone'),
  password: Joi.string().required().label('Password'),
};

const adminSchema = {
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
  _id: Joi.string().required().label('Admin ID'),
};

const adminCreateSchema = {
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
};

export {
  signInSchema,
  categorySchema,
  categoryCreateSchema,
  articleSchema,
  userSchema,
  adminSchema,
  adminCreateSchema,
  userCreateSchema,
};
