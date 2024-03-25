import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface InventoryModel extends Model<InferAttributes<InventoryModel>, InferCreationAttributes<InventoryModel>>{
  id?:            number,
  name_inventory: string,
  department:     string,
}