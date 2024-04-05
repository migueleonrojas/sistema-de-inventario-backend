import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface ArticleAssignedToInventoryModel extends Model<InferAttributes<ArticleAssignedToInventoryModel>, InferCreationAttributes<ArticleAssignedToInventoryModel>>{
  id?:            number,
  id_inventory:   number,
  id_location:    number,
  amount:         number,
  name:           string,
  brand:          string,
  model:          string,
  serial:         string,
  observation:    string, 
}