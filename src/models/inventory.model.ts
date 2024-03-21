
import { DataTypes } from "sequelize";
import sequelizeConnect from "../database/mssql";


import { InventoryModel } from "../interfaces/inventory.interface";

const Inventory = sequelizeConnect.sequelize.define<InventoryModel>(
  'Inventory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_inventory: {
      type: DataTypes.TEXT,
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
        min: {
          args: [3],
          msg: 'El nombre del Inventario no puede ser menor a las 3 letras contando los espacios.'
        },
        max: {
          args:[100],
          msg: 'El nombre del Inventario no puede superar las 100 letras contando los espacios.'
        },
        is: {
          args: ['^.+$','i'],
          msg:'El nombre del Inventario no es valido. Ejm: Equipos'
        }
      }
    }, 
    department: {
      type: DataTypes.TEXT,
      unique: {
        msg: 'department',
        name:'Nombre del Departamento del Inventario'
      },
      allowNull: false,
      validate: {
        async unique(value:any) {
          let inventoryDepartmentExist: InventoryModel | null = await Inventory.findOne<InventoryModel>({
            where:{
              department:value
            }
          });

          if(inventoryDepartmentExist != null) throw Error('El Nombre del Departamento del Inventario ya existe');
        },
        min: {
          args: [3],
          msg: 'El Nombre del Departamento del Inventario no puede ser menor a las 3 letras contando los espacios.'
        },
        max: {
          args:[100],
          msg: 'El Nombre del Departamento del Inventario no puede superar las 100 letras contando los espacios.'
        },
        is: {
          args: ['^.+$','i'],
          msg:'El Nombre del Departamento del Inventario no es valido. Ejm: Compras'
        }
      }
    
    }
  
  },
  {
    tableName: 'Inventorys'
  }
);

export default {
  Inventory
}