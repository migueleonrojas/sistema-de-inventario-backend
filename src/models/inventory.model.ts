
import { DataTypes } from "sequelize";
import sequelizeConnect from "../database/mssql";
import { InventoryModel } from "../interfaces/inventory.interface";
import article_assigned_to_InventoryModel from "./article_assigned_to_Inventory.model";
import locationModel from "./location.model";


const Inventory = sequelizeConnect.sequelize.define<InventoryModel>(
  'Inventory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_inventory: {
      type: DataTypes.STRING,
      unique: {
        msg: 'username',
        name:'Nombre del Inventario'
      },
      allowNull: false,
      validate: {
        async unique(value:any) {
          let inventoryNameInventoryExist: InventoryModel | null = await Inventory.findOne<InventoryModel>({
            where:{
              name_inventory:value
            }
          });

          if(inventoryNameInventoryExist != null) throw Error('El nombre del Inventario ya existe');
        },
        len: {
          args: [3, 100],
          msg: "El nombre del Inventario no puede ser menor a las 3 letras contando los espacios y no puede superar las 100 letras contando los espacios."
        },
        is: {
          args: ['^.+$','i'],
          msg:'El nombre del Inventario no es valido. Ejm: Equipos'
        }
      }
    }, 
    department: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "El Nombre del Departamento del Inventario no puede ser menor a las 3 letras contando los espacios y no puede superar las 100 letras contando los espacios."
        },
        is: {
          args: ['^.+$','i'],
          msg:'El Nombre del Departamento del Inventario no es valido. Ejm: Compras'
        }
      }
    
    }
  
  },
  {
    tableName: 'Inventorys',
  }
);

Inventory.hasMany(article_assigned_to_InventoryModel, {
  foreignKey: 'id_inventory'
});


export default Inventory
