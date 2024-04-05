import { ValidationError } from "sequelize";
import articleAssignedToInventoryModel from "../models/article_assigned_to_Inventory.model";
import { ArticleAssignedToInventoryModel } from "../interfaces/article_assigned_to_Inventory.interface";


const createArticleAssignedToInventoryService = async (query: any = {}) => {

  try{  

    const { articles_assigned_to_inventory } = query.body;

    const articlesAssignedToInventoryCreated: ArticleAssignedToInventoryModel[] = await articleAssignedToInventoryModel
    .bulkCreate<ArticleAssignedToInventoryModel>([...articles_assigned_to_inventory]);
    
    return {
      mesagge: 'Se han asignado los siguientes articulos al inventario.',
      article_assigned_to_inventory: articlesAssignedToInventoryCreated,
    }
  }
  catch(error: any) {
    if(error instanceof ValidationError){

      throw Error(`${error.errors[0].message}`);
    }
    else {
      throw Error(`${error.message}`);
    }
  }

}

export default {
  createArticleAssignedToInventoryService
}