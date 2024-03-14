import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>{
  id?:                number,
  fullname:           string,
  id_user:            string,
  username:           string,
  password:           string,
  email:              string,
  creation_date:      string,
  modification_date:  string
}