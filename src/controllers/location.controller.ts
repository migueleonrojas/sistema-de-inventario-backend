import locationService from "../services/location.service";

const createLocationController = async (req: any, res: any) => {

  try {
    let articleResult = await locationService.createLocationService(req);
    return res.status(200).json({
      status: 200,
      message: 'Localidad creado con exito',
      result: articleResult
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
  createLocationController
}