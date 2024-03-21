import emailService from "../services/email.service";

const sendEmailController = async (req: any, res: any) => {

  try{

    let sendEmailResult = await emailService.sendEmailService(req);
    res.status(200).json({
      status: 200,
      message: `Correo enviado exitosamente`,
      result: sendEmailResult
    })


  }
  catch(error:any){

    return res.status(400).json({
      status: 400,
      message: error.message
    });

  }
}

export default {
  sendEmailController
}