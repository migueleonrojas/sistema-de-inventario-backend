import { CreateOptions, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { ArticleModel } from "../interfaces/article.interface";
import sequelizeConnect from "../database/mssql";
import { User } from "./user.model";


export class Article extends Model<InferAttributes<ArticleModel>, InferCreationAttributes<ArticleModel>>{}

Article.init(
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "El Nombre del Articulo no puede ser menor a las 3 letras contando los espacios y no puede superar las 100 letras contando los espacios."
        },
        is: {
          args: ['^.+$','i'],
          msg:'El Nombre del Articulo no es valido. Ejm: Impresora'
        },
        notNull: {
          msg: 'El Nombre del Articulo no debe ser nulo.'
        }
      }
    },
    id_article: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El Id del Usuario que esta creando el Articulo no debe ser nulo.'
        }
      }
    },
    id_user: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [36,36],
          msg: 'El id del usuario debe tener 36 caracteres'
        },
        notNull: {
          msg: "El id del usuario no debe tener valores nulos"
        }
      }
    },
    brand: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "El Nombre de la Marca del Articulo no puede ser menor a las 3 letras contando los espacios y no puede superar las 100 letras contando los espacios."
        },
        is: {
          args: ['^.+$','i'],
          msg:'El Nombre de la Marca del Articulo no es valido. Ejm: Sony'
        },
        notNull: {
          msg: "El Nombre de la Marca del Articulo no debe tener valores nulos"
        }
      }
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "El Nombre del Modelo del Articulo no puede ser menor a las 3 letras contando los espacios y no puede superar las 100 letras contando los espacios."
        },
        is: {
          args: ['^.+$','i'],
          msg:'El Nombre del Modelo del Articulo no es valido. Ejm: Compact'
        },
        notNull: {
          msg: "El Nombre del Modelo del Articulo no debe tener valores nulos"
        }
      }
    },
    serial: {
      type: DataTypes.TEXT,
      unique: {
        msg: 'serial',
        name:'Serial del Articulo'
      },
      allowNull: false,
      validate: {
        async unique(value:any) {
          let serialArticleExist: Article | null = await Article.findOne<Article>({
            where:{
              serial:value
            }
          });

          if(serialArticleExist != null) throw Error('El Serial del Articulo ya existe');
        },
        len: {
          args: [3, 100],
          msg: "El Serial del Articulo no puede ser menor a las 3 letras contando los espacios y no puede superar las 100 letras contando los espacios."
        },
        is: {
          args: ['^.+$','i'],
          msg:'El Serial del Articulo no es valido. Ejm: 0000-0000-0000-0000'
        },
        notNull: {
          msg: "El Serial del Articulo no debe tener valores nulos"
        }
      }
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3, 4000],
          msg: "La Observación del Articulo no puede ser menor a las 3 letras contando los espacios y no puede superar las 4000 letras contando los espacios."
        },
        is: {
          args: ['.+','i'],
          msg:'La Observación del Articulo no es valido. Ejm: El articulo tiene la siguiente observación'
        },
        notNull: {
          msg: "La Observación del Articulo no debe tener valores nulos"
        }
      }
    }
  }, 
  {
    tableName: 'Articles',
    sequelize: sequelizeConnect,
    hooks: {
      async beforeSave(
        article: ArticleModel, 
        options: CreateOptions<InferAttributes<ArticleModel, {omit: never;}>>
      ) {
        const userWithThisUserIdExist: User | null  = await User.findOne<User>({
          where: {
            id_user: article.id_user
          }
        });
        if(userWithThisUserIdExist === null) throw Error('El id del usuario que intenta ingresar no existe para crear el articulo.');
      },
      async afterSave(
        article: ArticleModel, 
        options: CreateOptions<InferAttributes<ArticleModel, {omit: never;}>>
      ) {
        
        const updateIdArticleOfArticle: [affectedCount: number, affectedRows: Article[]] = await Article.update<Article>(
          {
            id_article: article.id,
          }, 
          {
            where: {
              id: article.id,
            },
            returning: true,
          },   
        );

        if(updateIdArticleOfArticle[0] === 0) throw Error('El articulo que desea actualizar no existe.');
        
      },
    }
  }
);