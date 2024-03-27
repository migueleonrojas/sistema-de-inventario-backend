import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface ArticleModel extends Model<InferAttributes<ArticleModel>, InferCreationAttributes<ArticleModel>>{
  id?:            number,
  name:           string,
  brand:          string,
  model:          string,
  serial:         string,
  observation:    string,
}