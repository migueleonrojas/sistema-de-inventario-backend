import express from 'express';
import validationBodySchemaMiddleware from '../middleware/validationBodySchema.middleware';
import verifyJWTMiddleware from '../middleware/verifyJWT.middleware';
import locationController from '../controllers/location.controller';
import locationValidators  from '../validators/location.validators';

const routerLocation = express.Router();

routerLocation.post(
  '/create-location',
  [verifyJWTMiddleware.verifyJsonWebToken, validationBodySchemaMiddleware.validateBodySchema(locationValidators.createLocationValidation)],
  locationController.createLocationController
);


export default { routerLocation };