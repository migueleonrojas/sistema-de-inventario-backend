import { DataTypes } from "sequelize";
import sequelizeConnect from "../database/mssql";

import { ArticleModel } from "../interfaces/article.interface";

/* id?:            number,
name:           string,
brand:          string,
model:          string,
serial:         string,
observation:    string, */


const Article = sequelizeConnect.sequelize.define<ArticleModel>(
  'Article', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      unique: {
        msg: 'name',
        name:'Nombre del Articulo'
      },
      allowNull: false,
      validate: {
        async unique(value:any) {
          let nameArticleExist: ArticleModel | null = await Article.findOne<ArticleModel>({
            where:{
              name:value
            }
          });

          if(nameArticleExist != null) throw Error('El Nombre del Articulo ya existe');
        },
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
      unique: {
        msg: 'brand',
        name:'Marca del Articulo'
      },
      allowNull: false,
      validate: {
        async unique(value:any) {
          let brandArticleExist: ArticleModel | null = await Article.findOne<ArticleModel>({
            where:{
              brand:value
            }
          });

          if(brandArticleExist != null) throw Error('El Nombre de la Marca del Articulo ya existe');
        },
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
      unique: {
        msg: 'model',
        name:'Modelo del Articulo'
      },
      allowNull: false,
      validate: {
        async unique(value:any) {
          let modelArticleExist: ArticleModel | null = await Article.findOne<ArticleModel>({
            where:{
              model:value
            }
          });

          if(modelArticleExist != null) throw Error('El Nombre del Modelo del Articulo ya existe');
        },
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


export default {
  Article
}