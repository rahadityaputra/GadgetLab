import Joi from "joi";
import { User } from "../model/userModel.js";

export const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  passwordConfirmation: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password confirmation does not match.'
    })
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
});

export const authenticationSignUp = async (
  username,
  email,
  password,
  passwordConfirmation
) => {
  const { error } = signupSchema.validate({
    username,
    email,
    password,
    passwordConfirmation,
  });

  if (error) {
    return {
      success: false,
      message: error.details[0].message,
    };
  }

  // masukkan ke database
  try {
    const user = await User.create({ username, email, password });
    return {
      success: true,
      user: {
        id: user.id_user,
        username: user.username,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "The username or email you entered is already registered. Please try a different one.",
    };
  }
};

export const authenticationLogin = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  console.log(error);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // cek di database
  const user = await User.findOne({
    where: { email, password },
  });

  if (user === null) {
    return {
      success: false,
      message: "account not found",
    };
  }

  return {
    success: true,
    user: {
      id: user.id_user,
      username: user.username,
    },
  };
};

