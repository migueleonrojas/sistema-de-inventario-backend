import Joi from "joi"
import { ArticleAssignedToInventoryModel } from "../interfaces/article_assigned_to_Inventory.interface";


const createArticleAssignedToInventoryValidation = Joi.object().keys({
  articles_assigned_to_inventory: Joi.array<ArticleAssignedToInventoryModel>().min(1).items(
    Joi.object<ArticleAssignedToInventoryModel>().keys({
      id_inventory: Joi.number().empty().required().messages({
        "number.base": "El id del inventario debe ser un número.",
        "number.empty": "El id del inventario no puede estar vacio.",
        "any.required": "El id del inventario debe indicarse.",
      }),
      id_location: Joi.number().empty().required().messages({
        "number.base": "El id de la locación debe ser un número.",
        "number.empty": "El id de la locación no puede estar vacio.",
        "any.required": "El id de la locación debe indicarse.",
      }),
      amount: Joi.number().empty().required().messages({
        "number.base": "La cantidad debe ser un número.",
        "number.empty": "La cantidad no puede estar vacio.",
        "any.required": "La cantidad debe indicarse.",
      }),
      name: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
        "string.base": "El nombre del Articulo a asignar al inventario debe ser un texto",
        "string.min": "El nombre del Articulo a asignar al inventario debe tener 3 caracter como mínimo",
        "string.max": "El nombre del Articulo a asignar al inventario debe tener 100 caracteres como máximo",
        "string.empty": "El nombre del Articulo a asignar al inventario no puede estar vacio",
        "any.required": "El nombre del Articulo a asignar al inventario debe indicarse",
        "string.pattern.base": "El nombre del Articulo a asignar al inventario tiene un formato incorrecto. Puede guiarse del siguiente nombre del articulo: Computadora",
      }),
      brand: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
        "string.base": "El nombre de la marca del Articulo a asignar al inventario debe ser un texto",
        "string.min": "El nombre de la marca del Articulo a asignar al inventario debe tener 3 caracter como mínimo",
        "string.max": "El nombre de la marca del Articulo a asignar al inventario debe tener 100 caracteres como máximo",
        "string.empty": "El nombre de la marca del Articulo a asignar al inventario no puede estar vacio",
        "any.required": "El nombre de la marca del Articulo a asignar al inventario debe indicarse",
        "string.pattern.base": "El nombre de la marca del Articulo a asignar al inventario tiene un formato incorrecto. Puede guiarse del siguiente nombre de la marca del articulo: Sony",
      }),
      model: Joi.string().min(3).max(100).empty().required().regex(/^.+$/i).messages({
        "string.base": "El nombre del modelo del Articulo a asignar al inventario debe ser un texto",
        "string.min": "El nombre del modelo del Articulo a asignar al inventario debe tener 3 caracter como mínimo",
        "string.max": "El nombre del modelo del Articulo a asignar al inventario debe tener 100 caracteres como máximo",
        "string.empty": "El nombre del modelo del Articulo a asignar al inventario no puede estar vacio",
        "any.required": "El nombre del modelo del Articulo a asignar al inventario debe indicarse",
        "string.pattern.base": "El nombre del modelo del Articulo a asignar al inventario tiene un formato incorrecto. Puede guiarse del siguiente nombre del modelo del articulo: Compact",
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
        "string.base": "La observación del Articulo a asignar al inventario debe ser un texto",
        "string.min": "La observación del Articulo a asignar al inventario debe tener 3 caracter como mínimo",
        "string.max": "La observación del Articulo a asignar al inventario debe tener 100 caracteres como máximo",
        "string.empty": "La observación del Articulo a asignar al inventario no puede estar vacio",
        "any.required": "La observación del Articulo a asignar al inventario debe indicarse",
        "string.pattern.base": "La observación del Articulo a asignar al inventario tiene un formato incorrecto. Puede guiarse de la siguiente observación del articulo: El articulo tiene la siguiente observación",
      })
    })
  )  
  .messages({
    "array.base": "La lista debe ser una lista de articulos.",
    'array.min': "La lista debe tener al menos 1 elemento",
    "array.empty": "La lista no puede estar vacia",
    "any.required": "La lista de articulos debe indicarse",
  })
});


export default {
  createArticleAssignedToInventoryValidation
}