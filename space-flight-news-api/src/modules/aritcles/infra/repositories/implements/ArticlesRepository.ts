import { IArticle } from "../../../domain/IArticle";
import { Repository, getRepository } from "typeorm";
import { Article } from "../../orm/entities/Article";
import { IArticlesRepository } from "../IArticlesRepository";

export class ArticlesRepository implements IArticlesRepository {
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
    return await this.ormRepository.query(
      `select * from articles
       order by d.id
       offset ${(page - 1) * take} rows fetch next ${take} rows only
      `);
  }

  async findById(id: number): Promise<IArticle | undefined> {
    return await this.ormRepository.findOne(id);
  }

  async findByTitle(title: string): Promise<IArticle | undefined> {
    return await this.ormRepository.findOne({ where: { title }});
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