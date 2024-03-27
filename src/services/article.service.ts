import { ValidationError } from "sequelize";
import { ArticleModel } from "../interfaces/article.interface";
import articleModel from "../models/article.model";


const createArticleService = async (query: any = {}) => {

  try {

    const { name, brand, model, serial, observation } = query.body;

    const newArticle: ArticleModel = await articleModel.Article.create<ArticleModel>({
      name: name,
      brand: brand,
      model: model,
      serial: serial,
      observation: observation
    });

    return {
      mesagge: 'Se ha creado un nuevo articulo.',
      article: newArticle,
    }


  }
  catch (error: any) {
    if(error instanceof ValidationError){

      throw Error(`${error.errors[0].message}`);
    }
    else {
      throw Error(`${error.message}`);
    }
  }

};

export default {
  createArticleService
}