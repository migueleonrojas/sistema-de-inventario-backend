import express from 'express';
import inventoryController from '../controllers/inventory.controller';
import validationBodySchemaMiddleware from '../middleware/validationBodySchema.middleware';
import verifyJWTMiddleware from '../middleware/verifyJWT.middleware';
import inventoryValidators  from '../validators/inventory.validators';

const routerInventory = express.Router();

routerInventory.get(
  '/get-last-id-inventory-created',
  verifyJWTMiddleware.verifyJsonWebToken,
  inventoryController.getLastIdInventoryCreatedController
);

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


routerInventory.delete(
  '/delete-inventory-by-id',
  [verifyJWTMiddleware.verifyJsonWebToken, validationBodySchemaMiddleware.validateBodySchema(inventoryValidators.deleteInventoryValidation)],
  inventoryController.deleteInventoryByIdController
);

export default { routerInventory };