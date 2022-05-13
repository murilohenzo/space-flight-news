import { IArticle } from "modules/aritcles/domain/article";
import { Repository, getRepository } from "typeorm";
import { Article } from "../../orm/entities/Article";
import { IArticleRepository } from "../IArticlesRepository";
import { Queries } from "./queries";


export class ArticlesRepository implements IArticleRepository {
  private ormRepository: Repository<Article>;

  constructor() {
    this.ormRepository = getRepository(Article);
  }

  async create(article: IArticle): Promise<IArticle | undefined> {
    const creatingArticle = this.ormRepository.create(article);
    await this.ormRepository.save(creatingArticle);
    return creatingArticle;
  }
  async findAll(take: number, page: number): Promise<IArticle[] | undefined> {
    return await this.ormRepository.query(Queries.pagination(take, page));
  }
  async findById(id: number): Promise<IArticle | undefined> {
    return await this.ormRepository.findOne(id);
  }
  async update(id: number, article: IArticle): Promise<IArticle | undefined> {
    return await this.ormRepository.save({
      id,
      ...article,
    });
  }
  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
  
}