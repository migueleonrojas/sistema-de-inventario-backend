import { UserModel } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import moment from "moment";
import bcrypt, { compareSync } from 'bcrypt';
import config from "../config/config";
import jwt from 'jsonwebtoken';
import { Op, ValidationError } from "sequelize";


const getUserByAnyAttributeService = async (query: any = {}) => {

  try {
  
    let attibutesWhere = Object.entries(query.body).map(e => { return {[e[0]]: e[1]};});

    const userFounded: UserModel | null = await userModel.User.findOne<UserModel>({
      where: {
        [Op.or]: [
          ...attibutesWhere
        ]
      }
    });

    if(userFounded === null) {
      throw Error('El usuario que intenta buscar no existe');
    }

    return {
      mesagge: 'Se ha consultado el usuario de forma exitosa',
      user: userFounded,
    };
    
  } 
  catch (error:any) {
    if(error instanceof ValidationError){
      throw Error(`${error.errors[0].message}`);
    }
    else {
      throw Error(`${error.message}`);
    }
  }

}


const createUserService = async (query: any = {}) => {

  try {

    let date: string = moment().format('YYYY-MM-DDTHH:mm:ss');

    const newUser: UserModel = await userModel.User.create<UserModel>({
      fullname: query.body.fullname,
      username: query.body.username,
      id_user: query.body.id_user,
      password: query.body.password,
      email: query.body.email,
      creation_date: date,
      modification_date: date,
    });

    return {
      mesagge: 'Se ha creado un nuevo usuario.',
      user: newUser,
    };
   
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

const loginUserService = async (query: any = {}) => {

  try{

    const { username, password } = query.body;

    const user: UserModel | null = await userModel.User.findOne<UserModel>({
      where: {
        username:username
      },
    });

    if(user === null){
      throw Error(`El nombre de usuario no existe`);
    }

    const valid = bcrypt.compareSync(password, user.get('password')!);

    if (!valid) {
      throw Error(`Las credenciales ingresadas son incorrectas`);
    }
    
    const token = jwt.sign({check: true}, config.jsonConfig.private_key, { expiresIn: '1d'});

    user.password = '';

    return {
      mesagge: 'Se ha ingresado con exito',
      user: user,
      token: token,
    };
    

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

const modifyUserService = async (query: any = {}) => {
  try{
    const { fullname, username, password, id_user, email, id } = query.body;

    const userModify: [affectedCount: number] = await userModel.User.update<UserModel>(
      {
        fullname: fullname,
        username: username,
        password: password,
        email: email,
        id_user: id_user,
        modification_date: moment().format('YYYY-MM-DDTHH:mm:ss')
      }, 
      {
        where: {
          id: id
        },
        individualHooks: true
      },
      
    );

    if(userModify[0] === 0) throw Error('El usuario que desea modificar no existe');

    return {
      mesagge: `Se modifico ${userModify[0]} ${userModify[0] > 1 ? 'registros': 'registro'} de los usuarios`
    };

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

const deleteUserService = async (query: any = {}) => {

  try{
    const { id } = query.body;

    let userDestroyed: number = await userModel.User.destroy<UserModel>({
      where: {
        id: id
      }
    });

    if(userDestroyed === 0) throw Error('El usuario que desea eliminar no existe');

    return {
      mesagge: `Se elimino ${userDestroyed} ${userDestroyed > 1 ? 'registros': 'registro'} de los usuarios`
    };

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
  createUserService,
  loginUserService,
  modifyUserService,
  deleteUserService,
  getUserByAnyAttributeService
}
