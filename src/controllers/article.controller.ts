import articleService from "../services/article.service";

const createArticleController = async (req: any, res: any) => {

  try{
    let articleResult = await articleService.createArticleService(req);
    return res.status(200).json({
      status: 200,
      message: 'Articulo creado con exito',
      result: articleResult
    });
  }
  catch(error: any) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }

}

export default {
  createArticleController
}