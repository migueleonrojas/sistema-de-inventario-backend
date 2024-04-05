import userRoutes from "./user.route";
import emailRoutes from "./email.route";
import inventoryRoutes from './inventory.route';
import articleRoutes from './article.route';
import articleAssignedToInventoryRoutes from './article_assigned_to_inventory.route';
import locationRoutes from './location.route';
import express from 'express';


const allRoutes = express.Router();

allRoutes.use([
  userRoutes.routerUser,
  emailRoutes.routerEmail,
  inventoryRoutes.routerInventory,
  articleRoutes.routerArticle,
  articleAssignedToInventoryRoutes.routerArticleAssignedToInventory,
  locationRoutes.routerLocation
]);


export default {
  allRoutes
}
