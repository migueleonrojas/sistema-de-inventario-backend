import { ValidationError } from "sequelize";
import { LocationModel } from "../interfaces/location.interface";
import locationModel from "../models/location.model";

const createLocationService = async (query: any = {}) => {

  try{
    const { name } = query.body;

    const newLocation: LocationModel = await locationModel.create<LocationModel>({
      name: name
    });

    return {
      mesagge: 'Se ha creado un nueva locación para su inventario.',
      location: newLocation,
    }


  }
  catch(error: any){
    if(error instanceof ValidationError){

      throw Error(`${error.errors[0].message}`);
    }
    else {
      throw Error(`${error.message}`);
    }
  }

}

export default {
  createLocationService
}