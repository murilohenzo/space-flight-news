import { IArticle } from "modules/aritcles/domain/article";

export interface IArticleRepository {
  create(article: IArticle): Promise<IArticle | undefined>;
  findAll(take: number, page: number): Promise<IArticle[] | undefined>;
  findById(id: number): Promise<IArticle | undefined>;
  update(id: number, article: IArticle): Promise<IArticle | undefined>;
  delete(id: number): Promise<void>;
}