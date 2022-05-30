import { injectable, inject } from "tsyringe";

import { ICreateArticleDTO } from "../../dtos/ICreateArticleDTO";
import { Article } from "../../infra/orm/entities/Article";
import { IArticlesRepository } from "../../infra/repositories/IArticlesRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CreateArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private readonly articlesRepository: IArticlesRepository
  ) {}

  async execute(article: ICreateArticleDTO): Promise<Article | undefined> {
    const existsArticle = await this.articlesRepository.findByTitle(article.title);
    if (existsArticle) throw new AppError("O artigo ja existe", StatusCodes.CONFLICT);

    if (Object.keys(article).length > 0) return this.articlesRepository.create(article);
    throw new AppError("Os campos sao obrigatorios", StatusCodes.BAD_REQUEST);
  }
}