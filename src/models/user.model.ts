import { CreateOptions, DataTypes, FindOptions, InferAttributes, InstanceUpdateOptions, Sequelize } from "sequelize";
import sequelizeConnect from "../database/mssql";
import bcrypt from 'bcrypt';
import { UserModel } from "../interfaces/user.interface";
import { Fn } from "sequelize/types/utils";
import { HookReturn } from "sequelize/types/hooks";

const User = sequelizeConnect.sequelize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre y apellido no puede estar vacio,'
        },
        min: {
          args: [3],
          msg: 'El nombre y apellido no puede ser menor a las 3 letras contando los espacios.'
        },
        max: {
          args:[50],
          msg: 'El nombre y apellido no puede superar las 50 letras contando los espacios.'
        },
        is:{
          args:['^[ÁÉÍÓÚáéíóúA-Za-z ]+$','i'],
          msg:'El nombre y apellido no valido. Ejm: Luis Guzman'
        },
      }
    },
    id_user: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        msg: 'La identificación ya existe',
        name: 'id_user'
      },
      validate: {
        async unique(value:any) {
          let userIdUserExist: UserModel | null = await User.findOne<UserModel>({
            where:{
              id_user:value
            }
          });

          if(userIdUserExist != null) throw Error('La identificación ya existe');
        },
        notEmpty: {
          msg: 'La identificación no puede estar vacio,'
        },
        min: {
          args: [11],
          msg: 'La identificación no puede ser menor a las 11 letras.'
        },
        max: {
          args: [11],
          msg: 'La identificación no puede superar las 11 letras.'
        },
        is: {
          args: ['^[V]{1,1}[-][0-9]{9,9}$','i'],
          msg:'La identificación no es valida. Ejm: V-023947635'
        },
      }
    },
    username: {
      type: DataTypes.TEXT,
      unique: {
        msg: 'username',
        name:'Nombre de usuario existente'
      },
      allowNull: false,
      validate: {
        async unique(value:any) {
          let userUsernameExist: UserModel | null = await User.findOne<UserModel>({
            where:{
              username:value
            }
          });

          if(userUsernameExist != null) throw Error('El nombre de usuario ya existe');
        },
        notEmpty: {
          msg: 'El nombre de usuario no puede estar vacio'
        },
        min: {
          args: [3],
          msg: 'El nombre de usuario no puede ser menor a las 3 letras.'
        },
        max: {
          args:[15],
          msg: 'El nombre de usuario no puede superar las 15 letras.'
        },
        is:{
          args:['^[A-Za-z]+$','i'],
          msg:'El nombre de usuario no es valido. Ejm: lguzman'
        }
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La contraseña no puede estar vacio'
        },
        min: {
          args: [3],
          msg: 'La contraseña no puede ser menor a las 3 letras.'
        },
        max: {
          args:[100],
          msg: 'La contraseña no puede superar las 100 letras.'
        },
        is:{
          args:['^[^ ]+$','g'],
          msg:'La contraseña no es valida. Ejm: Venezuela.2024'
        }
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        msg: 'El correo ya existe',
        name: 'email'
      },
      validate: {
        async unique(value:any) {
          let userWithEmailExist: UserModel | null = await User.findOne<UserModel>({
            where:{
              email:value
            }
          });

          if(userWithEmailExist != null) throw Error('El correo que ya existe');
        },
        is:{
          args:['^[a-z0-9\.\_\-]+@[a-z]+[.][a-z]+$','i'],
          msg:'El correo no es valido. Ejm: lguzman@freshfishdelivery.com'
        },
        max: {
          args:[50],
          msg: 'La correo no puede superar las 50 letras.'
        }
      },
    },
    creation_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modification_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
    hooks: {
      beforeSave (
        user: UserModel, 
        options: InstanceUpdateOptions<InferAttributes<UserModel, {omit: never;}>> | CreateOptions<InferAttributes<UserModel, {omit:never;}>>
      ): HookReturn {
        if(user.changed('password')) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        }
      },
      afterFind(
        instancesOrInstance: UserModel, 
        options: FindOptions<InferAttributes<UserModel, { omit: never;}>>
      ) {
        

      },
    }
 
  },
  

);



export default {
  User
}
