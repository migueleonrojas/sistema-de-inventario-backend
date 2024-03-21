import express from 'express';
import emailController from '../controllers/email.controller';
import validationBodySchemaMiddleware from '../middleware/validationBodySchema.middleware';
import emailValidators from '../validators/email.validators';


const routerEmail = express.Router();


routerEmail.post(
  "/send-email", 
  validationBodySchemaMiddleware.validateBodySchema(emailValidators.sendEmailValidation),
  emailController.sendEmailController
);


export default { routerEmail };