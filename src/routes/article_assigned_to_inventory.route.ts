import express from 'express';
import validationBodySchemaMiddleware from '../middleware/validationBodySchema.middleware';
import verifyJWTMiddleware from '../middleware/verifyJWT.middleware';
import article_assigned_to_inventoryController from '../controllers/article_assigned_to_inventory.controller';
import articleAssignedToInventoryValidators  from '../validators/article_assigned_to_inventory.validators';

const routerArticleAssignedToInventory = express.Router();


routerArticleAssignedToInventory.post(
  '/create-articles-assigned-to-inventory',
  [
    verifyJWTMiddleware.verifyJsonWebToken, 
    validationBodySchemaMiddleware.validateBodySchema(articleAssignedToInventoryValidators.createArticleAssignedToInventoryValidation)
  ],
  article_assigned_to_inventoryController.createArticleAssignedToInventoryController
);

export default { routerArticleAssignedToInventory };


