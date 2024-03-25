import Joi from "joi"
import { UserModel } from "../interfaces/user.interface";


const createUserValidation = Joi.object<UserModel>().keys({
  fullname: Joi.string().min(3).max(50).empty().required().regex(/^[ÁÉÍÓÚáéíóúA-Za-z ]+$/i).messages({
    "string.base": "El nombre y apellido debe ser un texto.",
    "string.min": "El nombre y apellido debe tener 3 letras como mínimo.",
    "string.max": "El nombre y apellido debe tener 50 letras como máximo.",
    "string.empty": "El nombre y apellido no puede estar vacio.",
    "any.required": "El nombre y apellido debe indicarse",
    "string.pattern.base": "El nombre y apellido tiene un formato incorrecto. Puede guiarse del siguiente nombre y apellido: Luis Guzman",

  }),
  id_user: Joi.string().min(10).max(11).empty().required().regex(/^[V]{1,1}[-][0-9]{9,9}$/i).messages({
    "string.base": "La identificación debe ser un texto.",
    "string.empty": "La identificación del usuario no puede estar vacio.",
    "string.min": "La identificación del usuario debe tener 10 letra como mínimo.",
    "string.max": "La identificación del usuario debe tener 10 letras como máximo",
    "string.pattern.base": "La identificación del usuario tiene un formato incorrecto. Puede guiarse de la siguiente identificación del usuario: V-023947635",
    "any.required": "La identificación del usuario debe indicarse",
  }),
  username: Joi.string().min(3).max(15).empty().required().regex(/^[A-Za-z]+$/i).messages({
    "string.base": "El nombre de usuario debe ser un texto.",
    "string.empty": "El nombre de usuario no puede estar vacio.",
    "string.min": "El nombre de usuario debe tener 3 caracter como mínimo",
    "string.max": "El nombre de usuario debe tener 15 caracteres como máximo",
    "string.pattern.base": "El nombre de usuario tiene un formato incorrecto. Puede guiarse del siguiente nombre de usuario: lguzman",
    "any.required": "El nombre de usuario debe indicarse",
  }),
  password: Joi.string().min(3).max(20).empty().required().regex(/^[^ ]+$/i).messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.empty": "La contraseña no puede estar vacio.",
    "string.min": "La contraseña debe tener 3 caracteres como mínimo",
    "string.max": "La contraseña debe tener 20 caracteres como máximo",
    "string.pattern.base": "La contraseña tiene un formato incorrecto. Puede guiarse de la siguiente contraseña: Venezuela.2024",
    "any.required": "La contraseña debe indicarse",
  }),
  email: Joi.string().max(50).empty().required().regex(/^[a-z0-9\.\_\-]+@[a-z]+[.][a-z]+$/i).messages({
    "string.base": "El correo corporativo ser un texto.",
    "string.empty": "El correo corporativo no puede estar vacio.",
    "string.max": "El correo corporativo debe tener 50 caracteres como máximo",
    "string.pattern.base": "El correo corporativo tiene un formato incorrecto. Puede guiarse del siguiente correo: lguzman@freshfishdelivery.com",
    "any.required": "El correo corporativo debe indicarse",
  }),
});


const loginUserValidation = Joi.object<UserModel>().keys({
  username: Joi.string().min(3).max(15).empty().required().regex(/^[A-Za-z]+$/i).messages({
    "string.base": "El nombre de usuario debe ser un texto.",
    "string.empty": "El nombre de usuario no puede estar vacio.",
    "string.min": "El nombre de usuario debe tener 3 caracter como mínimo",
    "string.max": "El nombre de usuario debe tener 15 caracteres como máximo",
    "string.pattern.base": "El nombre de usuario tiene un formato incorrecto. Puede guiarse del siguiente nombre de usuario: lguzman",
    "any.required": "El nombre de usuario debe indicarse",
  }),
  password: Joi.string().min(3).max(20).empty().required().regex(/^[^ ]+$/i).messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.empty": "La contraseña no puede estar vacio.",
    "string.min": "La contraseña debe tener 3 caracteres como mínimo",
    "string.max": "La contraseña debe tener 20 caracteres como máximo",
    "string.pattern.base": "La contraseña tiene un formato incorrecto. Puede guiarse de la siguiente contraseña: Venezuela.2024",
    "any.required": "La contraseña debe indicarse",
  }),
});


const modifyUserValidation = Joi.object<UserModel>().keys({
  id: Joi.number().strict().empty().required().messages({
    "number.base": "El id del usuario debe ser un número",
    "any.required": "El id del usuario debe indicarse",
    "number.empty": "El id del usuario no puede estar vacio.",
  }),
  fullname: Joi.string().min(3).max(50).empty().optional().regex(/^[ÁÉÍÓÚáéíóúA-Za-z ]+$/i).messages({
    "string.base": "El nombre y apellido debe ser un texto.",
    "string.min": "El nombre y apellido debe tener 3 letras como mínimo.",
    "string.max": "El nombre y apellido debe tener 50 letras como máximo.",
    "string.empty": "El nombre y apellido no puede estar vacio.",
    "string.pattern.base": "El nombre y apellido tiene un formato incorrecto. Puede guiarse del siguiente nombre y apellido: Luis Guzman",
  }),
  id_user: Joi.string().min(10).max(11).empty().optional().regex(/^[V]{1,1}[-][0-9]{9,9}$/i).messages({
    "string.base": "La identificación debe ser un texto.",
    "string.empty": "La identificación del usuario no puede estar vacio.",
    "string.min": "La identificación del usuario debe tener 10 letra como mínimo.",
    "string.max": "La identificación del usuario debe tener 10 letras como máximo",
    "string.pattern.base": "La identificación del usuario tiene un formato incorrecto. Puede guiarse de la siguiente identificación del usuario: V-023947635",
  }),
  username: Joi.string().min(3).max(15).empty().optional().regex(/^[A-Za-z]+$/i).messages({
    "string.base": "El nombre de usuario debe ser un texto.",
    "string.empty": "El nombre de usuario no puede estar vacio.",
    "string.min": "El nombre de usuario debe tener 3 caracter como mínimo",
    "string.max": "El nombre de usuario debe tener 15 caracteres como máximo",
    "string.pattern.base": "El nombre de usuario tiene un formato incorrecto. Puede guiarse del siguiente nombre de usuario: lguzman",
  }),
  password: Joi.string().min(3).max(20).empty().optional().regex(/^[^ ]+$/i).messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.empty": "La contraseña no puede estar vacio.",
    "string.min": "La contraseña debe tener 3 caracteres como mínimo",
    "string.max": "La contraseña debe tener 20 caracteres como máximo",
    "string.pattern.base": "La contraseña tiene un formato incorrecto. Puede guiarse de la siguiente contraseña: Venezuela.2024",
  }),
  email: Joi.string().max(50).empty().optional().regex(/^[a-z0-9\.\_\-]+@[a-z]+[.][a-z]+$/i).messages({
    "string.base": "El correo corporativo ser un texto.",
    "string.empty": "El correo corporativo no puede estar vacio.",
    "string.max": "El correo corporativo debe tener 50 caracteres como máximo",
    "string.pattern.base": "El correo corporativo tiene un formato incorrecto. Puede guiarse del siguiente correo: lguzman@freshfishdelivery.com",
  }),
});

const deleteUserValidation = Joi.object<UserModel>().keys({
  id: Joi.number().strict().empty().required().messages({
    "number.base": "El id del usuario debe ser un número",
    "any.required": "El id del usuario debe indicarse",
    "number.empty": "El id del usuario no puede estar vacio.",
  }),
});


const getUserByAnyAttributeValidation = Joi.object<UserModel>()
.or('id','fullname','id_user', 'username', 'password', 'email').
messages({
  'object.missing': "Debe indicar por lo menos uno de los siguientes campo: id, fullname, id_user, username, password, email"
})
.keys({
  id: Joi.number().strict().empty().optional().messages({
    "number.base": "El id del usuario debe ser un número",
    "any.required": "El id del usuario debe indicarse",
    "number.empty": "El id del usuario no puede estar vacio.",
  }),
  fullname: Joi.string().min(3).max(50).empty().optional().regex(/^[ÁÉÍÓÚáéíóúA-Za-z ]+$/i).messages({
    "string.base": "El nombre y apellido debe ser un texto.",
    "string.min": "El nombre y apellido debe tener 3 letras como mínimo.",
    "string.max": "El nombre y apellido debe tener 50 letras como máximo.",
    "string.empty": "El nombre y apellido no puede estar vacio.",
    "string.pattern.base": "El nombre y apellido tiene un formato incorrecto. Puede guiarse del siguiente nombre y apellido: Luis Guzman",
  }),
  id_user: Joi.string().min(10).max(11).empty().optional().regex(/^[V]{1,1}[-][0-9]{9,9}$/i).messages({
    "string.base": "La identificación debe ser un texto.",
    "string.empty": "La identificación del usuario no puede estar vacio.",
    "string.min": "La identificación del usuario debe tener 10 letra como mínimo.",
    "string.max": "La identificación del usuario debe tener 10 letras como máximo",
    "string.pattern.base": "La identificación del usuario tiene un formato incorrecto. Puede guiarse de la siguiente identificación del usuario: V-023947635",
  }),
  username: Joi.string().min(3).max(15).empty().optional().regex(/^[A-Za-z]+$/i).messages({
    "string.base": "El nombre de usuario debe ser un texto.",
    "string.empty": "El nombre de usuario no puede estar vacio.",
    "string.min": "El nombre de usuario debe tener 3 caracter como mínimo",
    "string.max": "El nombre de usuario debe tener 15 caracteres como máximo",
    "string.pattern.base": "El nombre de usuario tiene un formato incorrecto. Puede guiarse del siguiente nombre de usuario: lguzman",
  }),
  password: Joi.string().min(3).max(20).empty().optional().regex(/^[^ ]+$/i).messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.empty": "La contraseña no puede estar vacio.",
    "string.min": "La contraseña debe tener 3 caracteres como mínimo",
    "string.max": "La contraseña debe tener 20 caracteres como máximo",
    "string.pattern.base": "La contraseña tiene un formato incorrecto. Puede guiarse de la siguiente contraseña: Venezuela.2024",
  }),
  email: Joi.string().max(50).empty().optional().regex(/^[a-z0-9\.\_\-]+@[a-z]+[.][a-z]+$/i).messages({
    "string.base": "El correo corporativo ser un texto.",
    "string.empty": "El correo corporativo no puede estar vacio.",
    "string.max": "El correo corporativo debe tener 50 caracteres como máximo",
    "string.pattern.base": "El correo corporativo tiene un formato incorrecto. Puede guiarse del siguiente correo: lguzman@freshfishdelivery.com",
  }),
});


export default {
  createUserValidation,
  loginUserValidation,
  modifyUserValidation,
  deleteUserValidation,
  getUserByAnyAttributeValidation
}