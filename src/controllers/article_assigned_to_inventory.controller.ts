import article_assigned_to_inventoryService from "../services/article_assigned_to_inventory.service";

const createArticleAssignedToInventoryController = async (req: any, res: any) => {
  try{
    let articleAssignedToInventoryResult = await article_assigned_to_inventoryService.createArticleAssignedToInventoryService(req);
    return res.status(200).json({
      status: 200,
      message: 'Articulos asignados al inventario con exito',
      result: articleAssignedToInventoryResult
    });
  }
  catch(error: any) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
}

export default {
  createArticleAssignedToInventoryController
}