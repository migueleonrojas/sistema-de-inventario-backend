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


const consultInventoryByParamsController = async (req:any, res:any) => {
  try {

     let inventorysResults = await inventoryService.consultInventoryByParamsService(req);
     return res.status(200).json({
      status: 200,
      message: 'Resultado de la consulta de inventario',
      result: inventorysResults
    });

  }
  catch (error: any) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}

const getLastIdInventoryCreatedController =  async (req:any, res:any) => {

  try {

    let lastInventoryCreated = await inventoryService.getLastIdInventoryCreatedService();

    return res.status(200).json({
      status: 200,
      message: 'Resultado de la consulta del id del ultimo inventario creado',
      result: lastInventoryCreated
    });

  }
  catch(error:any) {
    return res.status(400).json({
      status: 400,
      message: error.mesagge
    });
  }
}

const deleteInventoryByIdController = async (req:any, res:any) => {

  try{

    let countOfInventoryDeleted = await inventoryService.deleteInventoryByIdService(req);

    return res.status(200).json({
      status: 200,
      message: 'Cantidad de inventarios eliminados',
      result: countOfInventoryDeleted
    });

  }
  catch(error:any) {
    return res.status(400).json({
      status: 400,
      message: error.mesagge
    });
  }
}


export default {
  createInventoryController,
  consultInventoryByParamsController,
  getLastIdInventoryCreatedController,
  deleteInventoryByIdController
}