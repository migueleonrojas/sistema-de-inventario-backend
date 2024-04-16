import { LocationModel } from "../interfaces/location.interface";
import sequelizeConnect from "../database/mssql";
import { DataTypes } from "sequelize";
import article_assigned_to_InventoryModel from "./article_assigned_to_Inventory.model";
import inventoryModel from "./inventory.model";



const Location =  sequelizeConnect.define<LocationModel>(
  'Location', 
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
        name: 'Nombre de la localidad'
      },
      allowNull: false,
    }
  },
  {
    tableName: 'Locations'
  }
);


export default Location
