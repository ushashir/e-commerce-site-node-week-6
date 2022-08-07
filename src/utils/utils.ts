import Joi from "joi";

export const createProductSchema = Joi.object().keys({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});

export const updateProuctSchema = Joi.object().keys({
  email: Joi.string().lowercase(),
  password: Joi.string(),
});

export const productRegistrationSchema = Joi.object().keys
    ({
        firstname: Joi.string().required,
        lastname: Joi.string().required,
        email: Joi.string().trim().lowercase().required(),
        phone_number: Joi.number().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        confirm_password: Joi.ref('password')

    })

export const createUserSchema = Joi.object().keys({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object().keys({
  email: Joi.string().lowercase(),
  password: Joi.string(),
});

export const registrationSchema = Joi.object().keys
    ({
        firstname: Joi.string().required,
        lastname: Joi.string().required,
        email: Joi.string().trim().lowercase().required(),
        phone_number: Joi.number().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        confirm_password: Joi.ref('password')

    })

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};