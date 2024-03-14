const validateFilesSchema = (schema: any) => (req: any, res: any, next: any) => {

  
  const { error } = schema.validate(req.files);

  console.log(error);

  if (error) {
    res.status(422).send({
      status: 422,
      message: error.details[0].message,
    });
  }
 
  else {
    next();
  }

}

export default {
  validateFilesSchema
}