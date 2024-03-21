import nodemailer, { SentMessageInfo } from 'nodemailer';
import config from "../config/config";
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

const transport: Mail<SentMessageInfo> = nodemailer.createTransport({
  host: 'hsrv99',
 /*  host: 'server.freshfishdelivery.com', */
  port: 587,
  secure: false, 
  auth: {
 
    user: config.jsonConfig.email_system,
    pass: config.jsonConfig.password_email_system
  }
});



/*correo para las pruebas =>  mleon@freshfishdelivery.com */
/* FFmleon**01 */ 

const sendEmailService = async (query: any = {}) => {
  try{
    const sentMessageInfo: SMTPTransport.SentMessageInfo= await transport.sendMail({
      from: query.body.from[0],
      to: query.body.to.join(', '),
      subject: query.body.subject,
      html: query.body.content
    })    

    if(sentMessageInfo.rejected){

      

      throw Error('El correo no se pudo enviar intentelo');

    }

    return {
      mesagge: `Correo enviando a ${query.body.to.join(', ')} exitosamente.`
    }

  }
  catch (error: any) {

    console.log(error);
    
    throw Error(error.message);
  }
}

export default {
  sendEmailService
}