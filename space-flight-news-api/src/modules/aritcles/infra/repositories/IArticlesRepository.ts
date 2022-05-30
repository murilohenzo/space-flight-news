import { Article } from "../orm/entities/Article";
import { ICreateArticleDTO } from "../../dtos/ICreateArticleDTO";
export interface IArticlesRepository {
  create(article: ICreateArticleDTO): Promise<Article | undefined>;
  findAll(take: number, page: number): Promise<Article[] | undefined>;
  findById(id: number): Promise<Article | undefined>;
  findByTitle(title: string): Promise<Article | undefined>;
  update(id: number, article: Article): Promise<Article | undefined>;
  delete(id: number): Promise<void>;
}