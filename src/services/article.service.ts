import { Op, Sequelize, ValidationError } from "sequelize";
import { ArticleModel } from "../interfaces/article.interface";
import articleModel from "../models/article.model";


const createArticleService = async (query: any = {}) => {

  try {

    const { name, brand, model, serial, observation } = query.body;

    const newArticle: ArticleModel = await articleModel.create<ArticleModel>({
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

const consultingArticlesByAnyParamService = async (query: any = {}) => {

  try{
    let attibutesWhere = Object.entries(query.body).map(e => Sequelize.where(Sequelize.fn('lower', Sequelize.col(e[0])), { [Op.like]: `%${e[1]}%`}));

    const articles: ArticleModel[] = await articleModel.findAll<ArticleModel>({
      where: {
        [Op.or]: [
          ...attibutesWhere
        ]
      }
    });

    return {
      mesagge: `Cantidad de articulos obtenidos => ${articles.length}.`,
      articles: articles,
    }


  }
  catch(error:any){
    if(error instanceof ValidationError){
      throw Error(`${error.errors[0].message}`);
    }
    else {
      throw Error(`${error.message}`);
    }
  }

};

export default {
  createArticleService,
  consultingArticlesByAnyParamService
}