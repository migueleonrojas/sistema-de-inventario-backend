import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface LocationModel extends Model<InferAttributes<LocationModel>, InferCreationAttributes<LocationModel>>{
  id?:  number,
  name: string,
}