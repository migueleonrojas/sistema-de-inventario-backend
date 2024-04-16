import { CreateOptions, InferAttributes, Model, Op, Sequelize, ValidationError } from "sequelize";
import { Article } from "../models/article.model";
import { ArticleModel } from "../interfaces/article.interface";

const createArticleService = async (query: any = {}) => {

  try {

    const { name, brand, model, serial, observation, id_user } = query.body;

    let newArticle: Article = await Article.create<Article>({
      id_article: Math.floor(Math.random() * 1000000),      
      id_user: id_user,
      name: name,
      brand: brand,
      model: model,
      serial: serial,
      observation: observation
    });

    let articleAfterSaved: Article | null = await Article.findByPk(newArticle.getDataValue('id'));
    
    return {
      mesagge: 'Se ha creado un nuevo articulo.',
      article: articleAfterSaved,
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

    const articles: Article[] = await Article.findAll<Article>({
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