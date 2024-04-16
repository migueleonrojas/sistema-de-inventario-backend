import moment from "moment";
import bcrypt from 'bcrypt';
import config from "../config/config";
import jwt from 'jsonwebtoken';
import { Op, ValidationError } from "sequelize";
import { v1 as uuidv1 } from 'uuid';
import { User } from "../models/user.model";

const getUserByAnyAttributeService = async (query: any = {}) => {

  try {
  
    let attibutesWhere = Object.entries(query.body).map(e => { return {[e[0]]: e[1]};});

    const userFounded: User | null = await User.findOne<User>({
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

    const { fullname, username, password, email } = query.body;

    let date: string = moment().format('YYYY-MM-DDTHH:mm:ss');

    let id_user: string = uuidv1();

    const newUser: User = await User.create<User>({
      fullname: fullname,
      username: username,
      id_user: id_user,
      password: password,
      email: email,
      creation_date: date,
      modification_date: date,
    });

    newUser.setDataValue('password', '');

    
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

    const user: User | null = await User.findOne<User>({
      
      where: {
        username:username
      },
    });

    if(user === null){
      throw Error(`El nombre de usuario no existe`);
    }

    const valid = bcrypt.compareSync(password, user.getDataValue('password'));

    if (!valid) {
      throw Error(`Las credenciales ingresadas son incorrectas`);
    }
    
    const token = jwt.sign({check: true}, config.jsonConfig.private_key, { expiresIn: '1d'});

    user.setDataValue('password', '');

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

    const userModify: [affectedCount: number] = await User.update<User>(
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
    console.log(error);
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

    let userDestroyed: number = await User.destroy<User>({
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
