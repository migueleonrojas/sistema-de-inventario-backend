import express from 'express';
import validationBodySchemaMiddleware from '../middleware/validationBodySchema.middleware';
import verifyJWTMiddleware from '../middleware/verifyJWT.middleware';
import articleValidators  from '../validators/article.validators';
import articleController from '../controllers/article.controller';

const routerArticle = express.Router();

routerArticle.post(
  '/create-article',
  [verifyJWTMiddleware.verifyJsonWebToken, validationBodySchemaMiddleware.validateBodySchema(articleValidators.createArticleValidation)],
  articleController.createArticleController
);

export default { routerArticle };