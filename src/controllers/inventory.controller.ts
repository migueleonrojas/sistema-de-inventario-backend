import inventoryService from "../services/inventory.service";

const createInventoryController = async (req: any, res: any) => {

  try {
    let inventoryResult = await inventoryService.createInventoryService(req);
    return res.status(200).json({
      status: 200,
      message: 'Inventario creado con exito',
      result: inventoryResult
    });
  }
  catch (error: any) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}

export default {
  createInventoryController
}