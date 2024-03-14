const verifyJsonWebToken = (req:any, res:any, next:any) => {
  
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  console.log(token);

  next();
}


export default {
  verifyJsonWebToken
}