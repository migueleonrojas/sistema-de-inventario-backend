import express from 'express';
import inventoryController from '../controllers/inventory.controller';
import validationBodySchemaMiddleware from '../middleware/validationBodySchema.middleware';
import verifyJWTMiddleware from '../middleware/verifyJWT.middleware';
import inventoryValidators  from '../validators/inventory.validators';

const routerInventory = express.Router();

routerInventory.post(
  '/consult-inventory',
  [verifyJWTMiddleware.verifyJsonWebToken, validationBodySchemaMiddleware.validateBodySchema(inventoryValidators.consultInventoryValidation)],
  inventoryController.consultInventoryByParamsController
);

routerInventory.post(
  '/create-inventory',
  [verifyJWTMiddleware.verifyJsonWebToken ,validationBodySchemaMiddleware.validateBodySchema(inventoryValidators.createInventoryValidation)],
  inventoryController.createInventoryController
);

export default { routerInventory };