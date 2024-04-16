import { CreateOptions, DataTypes, InferAttributes, InferCreationAttributes, InstanceUpdateOptions, Model } from "sequelize";
import { UserModel } from "../interfaces/user.interface";
import sequelizeConnect from "../database/mssql";
import bcrypt from 'bcrypt';


export class User extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>{}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre y apellido no puede estar vacio,'
        },
        len: {
          args: [3, 50],
          msg: "El nombre y apellido no puede ser menor a las 3 letras contando los espacios y no puede superar las 50 letras contando los espacios."
        },
        is:{
          args:['^[ÁÉÍÓÚáéíóúA-Za-z ]+$','i'],
          msg:'El nombre y apellido no valido. Ejm: Luis Guzman'
        },
        notNull: {
          msg: 'El nombre y apellido no puede ser nulo'
        }
      }
    },
    id_user: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: {
          args: [36, 36],
          msg: 'El id del usuario debe tener 36 caracteres'
        },
        notNull: {
          msg: 'El id del usuario no puede ser nulo'
        }

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

          let userUsernameExist: User | null = await User.findOne<User>({
            where: {
              username: value
            }
          });

          if(userUsernameExist != null) throw Error('El nombre de usuario ya existe');
        },
        notEmpty: {
          msg: 'El nombre de usuario no puede estar vacio'
        },
        len: {
          args: [3, 15],
          msg: "El nombre de usuario no puede ser menor a las 3 letras contando los espacios y no puede superar las 15 letras contando los espacios."
        },
        is:{
          args:['^[A-Za-z]+$','i'],
          msg:'El nombre de usuario no es valido. Ejm: lguzman'
        },
        notNull: {
          msg: 'El nombre de usuario no puede ser nulo'
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
        len: {
          args: [3, 100],
          msg: "La contraseña no puede ser menor a las 3 letras contando los espacios y no puede superar las 100 letras contando los espacios."
        },
        is:{
          args:['^[^ ]+$','g'],
          msg:'La contraseña no es valida. Ejm: Venezuela.2024'
        },
        notNull: {
          msg: 'La contraseña no puede ser nulo'
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
          let userWithEmailExist: User | null = await User.findOne<User>({
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
        len: {
          args: [3, 50],
          msg: "El correo no puede ser menor a las 3 letras contando los espacios y no puede superar las 50 letras contando los espacios."
        },
        notNull: {
          msg: 'El correo no puede ser nulo'
        }
      },
    },
    creation_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La fecha de creación no puede ser nulo'
        }
      }
    },
    modification_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La fecha de modificación no puede ser nulo'
        }
      }
    },

  }, {
    tableName:'Users',
    sequelize: sequelizeConnect,
    hooks: {
      beforeSave (
        user: UserModel, 
        options: InstanceUpdateOptions<InferAttributes<UserModel, {omit: never;}>> | CreateOptions<InferAttributes<UserModel, {omit:never;}>>
      ) {
        if(user.changed('password')) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        }
      }
    }
  }
);