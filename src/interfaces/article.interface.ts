import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface ArticleModel extends Model<InferAttributes<ArticleModel>, InferCreationAttributes<ArticleModel>>{
  id?:            number,
  id_article?:    number,
  id_user:        string,
  name:           string,
  brand:          string,
  model:          string,
  serial:         string,
  observation:    string,
}