import config from "../config/config";
import jwt from 'jsonwebtoken';

const verifyJsonWebToken = async (req:any, res:any, next:any)  => {

  let token: string = req.headers['x-access-token'] || req.headers['authorization'];
    
  if(!token) {
    return res.status(400).json({
      status: 400,
      message: 'Es necesario el token para la autenticación'
    });
  }

  if(token.startsWith('Bearer ')){
    token = token.replace('Bearer ', '');
  }

  if(token) {
    jwt.verify(token, config.jsonConfig.private_key, (error: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
      if(error){
        return res.status(400).json({
          status: 400,
          message: 'El token no es valido'
        })
      }
      else{
        req.decoded = decoded;
        next();
      }
    });
  }
}


export default {
  verifyJsonWebToken
}