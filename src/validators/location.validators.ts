import Joi from "joi"
import { LocationModel } from "../interfaces/location.interface";

const createLocationValidation = Joi.object<LocationModel>().keys({
  name: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
    "string.base": "El nombre de la Locación debe ser un texto",
    "string.min": "El nombre de la Locación debe tener 3 caracter como mínimo",
    "string.max": "El nombre de la Locación debe tener 100 caracteres como máximo",
    "string.empty": "El nombre de la Locación no puede estar vacio",
    "any.required": "El nombre de la Locación debe indicarse",
    "string.pattern.base": "El nombre de la Locación tiene un formato incorrecto. Puede guiarse del siguiente nombre de la Locación: La Florida",
  }),
});

export default {
  createLocationValidation
}