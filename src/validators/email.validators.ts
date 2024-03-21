import Joi from "joi"

const sendEmailValidation = Joi.object().keys({
  subject: Joi.string().required().empty().messages({
    "string.base": "El asunto debe ser un texto.",
    "string.empty": "El asunto no puede estar vacio.",
    "any.required": "El asunto debe indicarse",
  }),
  content: Joi.string().required().empty().messages({
    "string.base": "El contenido del correo debe ser un texto.",
    "string.empty": "El contenido del correo no puede estar vacio.",
    "any.required": "El contenido del correo debe indicarse",
  }),
  from: Joi.array<string>().required().empty().messages({
    "array.base": "La lista de correos remitentes deben ser una lista de texto.",
    "array.empty": "La lista de correos remitentes no puede estar vacia",
    "any.required": "La lista de correos remitentes debe indicarse",
  }),
  to: Joi.array<string>().required().empty().messages({
    "array.base": "La lista de correos destinatarios deben ser una lista de texto.",
    "array.empty": "La lista de correos destinatarios no puede estar vacia",
    "any.required": "La lista de correos destinatarios debe indicarse",
  })
});

export default {
  sendEmailValidation
}
