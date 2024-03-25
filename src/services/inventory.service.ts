import { Op, Sequelize, ValidationError, fn } from "sequelize";
import { InventoryModel } from "../interfaces/inventory.interface";
import inventoryModel from "../models/inventory.model";


const createInventoryService = async (query: any = {}) => {

  try {
    const { name_inventory, department } = query.body;

    const newInventory: InventoryModel = await inventoryModel.Inventory.create<InventoryModel>({
      name_inventory: name_inventory,
      department: department
    });

    return {
      mesagge: 'Se ha creado un nuevo inventario.',
      inventory: newInventory,
    }
  }
  catch (error: any) {

    if(error instanceof ValidationError){

      throw Error(`${error.errors[0].message}`);
    }
    else {
      throw Error(`${error.message}`);
    }
  }
}


const consultInventoryByParamsService = async (query: any = {}) => {

  try{
   
    let attibutesWhere = Object.entries(query.body).map(e => {
      return Sequelize.where(
        Sequelize.fn('lower', Sequelize.col(e[0])), {
          [Op.like]: `%${e[1]}%`
        }
      );
    });

    
    const inventorys: InventoryModel[] = await inventoryModel.Inventory.findAll<InventoryModel>({
      where: {
        [Op.or]: [
          ...attibutesWhere,
        ],
      }
    });

    return {
      mesagge: `Cantidad de inventarios obtenidos => ${inventorys.length}.`,
      inventorys: inventorys,
    }



  }
  catch(error: any) {

    if(error instanceof ValidationError){

      throw Error(`${error.errors[0].message}`);
    }
    else {
      throw Error(`${error.message}`);
    }

  }
}




export default {
  createInventoryService,
  consultInventoryByParamsService
}