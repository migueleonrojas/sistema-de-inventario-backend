import userRoutes from "./user.route";
import emailRoutes from "./email.route";
import inventoryRoutes from './inventory.route';
import articleRoutes from './article.route';
import express from 'express';


const allRoutes = express.Router();

allRoutes.use([
  userRoutes.routerUser,
  emailRoutes.routerEmail,
  inventoryRoutes.routerInventory,
  articleRoutes.routerArticle
]);


export default {
  allRoutes
}
