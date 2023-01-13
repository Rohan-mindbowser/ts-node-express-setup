import Joi from "joi";

export const validateSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string()
    .min(3)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.min": "Must have at least 8 characters",
      "string.pattern.base":
        "Password must contain only characters and numbers",
    }),
});

export const validateManagerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
});
