import { DataTypes } from "sequelize";
import sequelizeConnect from "../database/mssql";

import { ArticleModel } from "../interfaces/article.interface";

const Article = sequelizeConnect.sequelize.define<ArticleModel>(
  'Article', 
  {
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
          let serialArticleExist: ArticleModel | null = await Article.findOne<ArticleModel>({
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
        }
      }
    }
  },
  {
    tableName: 'Articles'
  }
);

export default Article
