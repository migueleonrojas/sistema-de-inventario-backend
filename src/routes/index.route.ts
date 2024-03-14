import userRoutes from "./user.route";
import express from 'express';


const allRoutes = express.Router();

allRoutes.use(userRoutes.routerUser);

export default {
  allRoutes
}
