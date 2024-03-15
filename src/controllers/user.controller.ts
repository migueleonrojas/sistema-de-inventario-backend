import userService from '../services/user.service';


const createUserController = async (req: any, res: any) => {

  try {
    let userResult = await userService.createUserService(req);
    return res.status(200).json({
      status: 200,
      message: 'Usuario creado con exito',
      result: userResult
    });
  }
  catch (error: any) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
  
}


const loginUserController = async (req: any, res:any) => {
  try{
    let userLoginResult = await userService.loginUserService(req);

    return res.status(200).json({
      status: 200,
      message: "Usuario autenticado con exito",
      result: userLoginResult
    });
  }
  catch(error:any){
    return res.status(400).json({
      status: 400,
      message: error.message
    });

  }
}


const modifyUserController = async (req:any, res:any) => {

  try {

    let userModifyResult = await userService.modifyUserService(req);

    return res.status(200).json({
      status: 200,
      message: "Usuario modificado con exito",
      result: userModifyResult
    });

  }
  catch(error:any){
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }

}


const deleteUserController = async (req:any, res:any) => {

  try {

    let userModifyResult = await userService.deleteUserService(req);

    return res.status(200).json({
      status: 200,
      message: "Usuario eliminado con exito",
      result: userModifyResult
    });

  }
  catch(error:any){
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }

}

const getUserByAnyAttributeController = async (req: any, res: any) => {

  
  try {
    
    let userFoundedResult = await userService.getUserByAnyAttributeService(req);

    return res.status(200).json({
      status: 200,
      message: "Consulta de usuario realizada con exito",
      result: userFoundedResult
    });


  } 
  catch (error:any) {
    
    return res.status(400).json({
      status: 400,
      message: error.message
    });

  }


}



export default {
  createUserController,
  loginUserController,
  modifyUserController,
  deleteUserController,
  getUserByAnyAttributeController
}