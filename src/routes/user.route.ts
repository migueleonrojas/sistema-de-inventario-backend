import express, { NextFunction } from 'express';
import userController from '../controllers/user.controller';
import validationBodySchemaMiddleware from '../middleware/validationBodySchema.middleware';
import validationQuerySchemaMiddleware from '../middleware/validationQuerySchema.middleware';
import verifyJWTMiddleware from '../middleware/verifyJWT.middleware';
import userValidators  from '../validators/user.validators';

const routerUser = express.Router();


routerUser.get(
  '/get-user-by-any-attribute',
  [verifyJWTMiddleware.verifyJsonWebToken ,validationBodySchemaMiddleware.validateBodySchema(userValidators.getUserByAnyAttributeValidation)],
  userController.getUserByAnyAttributeController
);

routerUser.post(
  '/create-user',
  [validationBodySchemaMiddleware.validateBodySchema(userValidators.createUserValidation)],
  userController.createUserController
);

routerUser.post(
  '/login-user',
  [validationBodySchemaMiddleware.validateBodySchema(userValidators.loginUserValidation)],
  userController.loginUserController
);

routerUser.put(
  '/modify-user',
  [verifyJWTMiddleware.verifyJsonWebToken, validationBodySchemaMiddleware.validateBodySchema(userValidators.modifyUserValidation)],
  userController.modifyUserController
);

routerUser.delete(
  '/delete-user',
  [verifyJWTMiddleware.verifyJsonWebToken, validationBodySchemaMiddleware.validateBodySchema(userValidators.deleteUserValidation)],
  userController.deleteUserController
);

export default { routerUser };