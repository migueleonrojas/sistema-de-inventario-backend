import Joi from "joi"
import { ArticleModel } from "../interfaces/article.interface";

const createArticleValidation = Joi.object<ArticleModel>().keys({
  id_article: Joi.number().empty().messages({
    "number.base": "El id del articulo debe ser un número.",
    "number.empty": "El id del articulo no puede estar vacio.",
  }),
  id_user: Joi.string().required().empty().max(36).messages({
    "string.base": "El id del usuario debe ser un texto",
    "any.required": "El id del usuario debe indicarse",
    "string.empty": "El id del usuario no puede estar vacio",
    "string.max": "El id del usuario debe tener 36 caracteres como máximo",
  }),
  name: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
    "string.base": "El nombre del Articulo debe ser un texto",
    "string.min": "El nombre del Articulo debe tener 3 caracter como mínimo",
    "string.max": "El nombre del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El nombre del Articulo no puede estar vacio",
    "any.required": "El nombre del Articulo debe indicarse",
    "string.pattern.base": "El nombre del Articulo tiene un formato incorrecto. Puede guiarse del siguiente nombre del articulo: Computadora",
  }),
  brand: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
    "string.base": "El nombre de la marca del Articulo debe ser un texto",
    "string.min": "El nombre de la marca del Articulo debe tener 3 caracter como mínimo",
    "string.max": "El nombre de la marca del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El nombre de la marca del Articulo no puede estar vacio",
    "any.required": "El nombre de la marca del Articulo debe indicarse",
    "string.pattern.base": "El nombre de la marca del Articulo tiene un formato incorrecto. Puede guiarse del siguiente nombre de la marca del articulo: Sony",
  }),
  model: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
    "string.base": "El nombre del modelo del Articulo debe ser un texto",
    "string.min": "El nombre del modelo del Articulo debe tener 3 caracter como mínimo",
    "string.max": "El nombre del modelo del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El nombre del modelo del Articulo no puede estar vacio",
    "any.required": "El nombre del modelo del Articulo debe indicarse",
    "string.pattern.base": "El nombre del modelo del Articulo tiene un formato incorrecto. Puede guiarse del siguiente nombre del modelo del articulo: Compact",
  }),
  serial: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
    "string.base": "El serial del Articulo debe ser un texto",
    "string.min": "El serial del Articulo debe tener 3 caracter como mínimo",
    "string.max": "El serial del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El serial del Articulo no puede estar vacio",
    "any.required": "El serial del Articulo debe indicarse",
    "string.pattern.base": "El serial del Articulo tiene un formato incorrecto. Puede guiarse del siguiente serial de articulo: 0000-0000-0000-0000",
  }),
  observation: Joi.string().min(3).max(4000).empty().required().regex(/.+/i).messages({
    "string.base": "La observación del Articulo debe ser un texto",
    "string.min": "La observación del Articulo debe tener 3 caracter como mínimo",
    "string.max": "La observación del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "La observación del Articulo no puede estar vacio",
    "any.required": "La observación del Articulo debe indicarse",
    "string.pattern.base": "La observación del Articulo tiene un formato incorrecto. Puede guiarse de la siguiente observación del articulo: El articulo tiene la siguiente observación",
  })
});


const consultInventoryValidation = Joi.object<ArticleModel>()
.or('name', 'brand', 'model', 'serial', 'observation').
messages({
  'object.missing': "Debe indicar por lo menos uno de los siguientes campo: name, brand, model, serial, observation"
})
.keys({
  name: Joi.string().max(100).empty().regex(/^.+$/i).messages({
    "string.base": "El nombre del Articulo debe ser un texto",
    "string.max": "El nombre del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El nombre del Articulo no puede estar vacio",
    "string.pattern.base": "El nombre del Articulo tiene un formato incorrecto. Puede guiarse del siguiente nombre del articulo: Computadora",
  }),
  brand: Joi.string().max(100).empty().regex(/^.+$/i).messages({
    "string.base": "El nombre de la marca del Articulo debe ser un texto",
    "string.max": "El nombre de la marca del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El nombre de la marca del Articulo no puede estar vacio",
    "string.pattern.base": "El nombre de la marca del Articulo tiene un formato incorrecto. Puede guiarse del siguiente nombre de la marca del articulo: Sony",
  }),
  model: Joi.string().max(100).empty().regex(/^.+$/i).messages({
    "string.base": "El nombre del modelo del Articulo debe ser un texto",
    "string.max": "El nombre del modelo del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El nombre del modelo del Articulo no puede estar vacio",
    "string.pattern.base": "El nombre del modelo del Articulo tiene un formato incorrecto. Puede guiarse del siguiente nombre del modelo del articulo: Compact",
  }),
  serial: Joi.string().max(100).empty().regex(/^.+$/i).messages({
    "string.base": "El serial del Articulo debe ser un texto",
    "string.max": "El serial del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "El serial del Articulo no puede estar vacio",
    "string.pattern.base": "El serial del Articulo tiene un formato incorrecto. Puede guiarse del siguiente serial de articulo: 0000-0000-0000-0000",
  }),
  observation: Joi.string().max(4000).empty().regex(/.+/i).messages({
    "string.base": "La observación del Articulo debe ser un texto",
    "string.max": "La observación del Articulo debe tener 100 caracteres como máximo",
    "string.empty": "La observación del Articulo no puede estar vacio",
    "string.pattern.base": "La observación del Articulo tiene un formato incorrecto. Puede guiarse de la siguiente observación del articulo: El articulo tiene la siguiente observación",
  })
});

export default {
  createArticleValidation,
  consultInventoryValidation
}