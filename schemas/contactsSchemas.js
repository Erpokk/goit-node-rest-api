import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 30 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  phone: Joi.string().pattern(/^\(\d{3}\)\s*\d{3}-\d{4}$/).required().messages({
    'string.empty': 'Phone is required',
    'string.pattern.base': 'Phone must be in format (123) 456-7890',
  }),
  favorite: Joi.boolean(),
}).min(1).messages({
  'object.min': 'Body must have at least one field'
})

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 30 characters long',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  phone: Joi.string().pattern(/^\(\d{3}\)\s*\d{3}-\d{4}$/).messages({
    'string.pattern.base': 'Phone must be in format (123) 456-7890',
  }),
  favorite: Joi.boolean(),
}).min(1).messages({
  'object.min': 'Body must have at least one field'
})

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'Favorite is required',
  }),
}).min(1).messages({
  'object.min': 'Body must have favorite field'
})