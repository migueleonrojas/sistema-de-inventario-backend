import Joi from "joi"
import { InventoryModel } from "../interfaces/inventory.interface";

const createInventoryValidation = Joi.object<InventoryModel>().keys({
  name_inventory: Joi.string().empty().min(3).max(100).required().regex(/^.+$/i).messages({
    "string.base": "El nombre del inventario debe ser un texto.",
    "string.empty": "El nombre del inventario no puede estar vacio.",
    "string.min": "El nombre del inventario debe tener 3 caracter como mínimo",
    "string.max": "El nombre del inventario debe tener 100 caracteres como máximo",
    "string.pattern.base": "El nombre del inventario tiene un formato incorrecto. Puede guiarse del siguiente nombre de inventario: Equipos",
    "any.required": "El nombre del inventario debe indicarse",
  }),
  department: Joi.string().empty().min(3).max(100).required().regex(/^.+$/i).messages({
    "string.base": "El Nombre del Departamento del Inventario debe ser un texto.",
    "string.empty": "El Nombre del Departamento del Inventario no puede estar vacio.",
    "string.min": "El Nombre del Departamento del Inventario debe tener 3 caracteres como mínimo",
    "string.max": "El Nombre del Departamento del Inventario debe tener 100 caracteres como máximo",
    "string.pattern.base": "El Nombre del Departamento del Inventario tiene un formato incorrecto. Puede guiarse de la siguiente Nombre del Departamento del Inventario: Compras",
    "any.required": "El Nombre del Departamento del Inventario debe indicarse",
  }),
});

export default {
  createInventoryValidation
}