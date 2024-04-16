import { DataTypes } from "sequelize";
import sequelizeConnect from "../database/mssql";
import { ArticleAssignedToInventoryModel } from "../interfaces/article_assigned_to_Inventory.interface";
import inventoryModel from "./inventory.model";
import locationModel from "./location.model";

const ArticleAssignedToInventory = sequelizeConnect.define<ArticleAssignedToInventoryModel>(
  'ArticleAssignedToInventory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_inventory:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_location:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
         len: {
          args: [3, 100],
          msg: 'El nombre del Articulo ha asignar al inventario debe tener como mínimo 3 letras y como máximo 100 letras.'
         }
      }
    },
    brand: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
         args: [3, 100],
         msg: 'El nombre de la marca del Articulo ha asignar al inventario debe tener como mínimo 3 letras y como máximo 100 letras.'
        }
     }
    },
    model: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'El nombre del modelo del Articulo ha asignar al inventario debe tener como mínimo 3 letras y como máximo 100 letras.'
         }
      }
    },
    serial: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'El serial del Articulo ha asignar al inventario debe tener como mínimo 3 letras y como máximo 100 letras.'
         }
      }
    },
    observation: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'La observacion sobre el Articulo ha asignar al inventario debe tener como mínimo 3 letras y como máximo 4000 letras.'
         }
      }
    }
    
  },
  {
    tableName: 'Articles_Assigned_To_Inventory',
  }
);

ArticleAssignedToInventory.belongsTo(locationModel, {
  foreignKey: 'id_location'
});

export default ArticleAssignedToInventory
