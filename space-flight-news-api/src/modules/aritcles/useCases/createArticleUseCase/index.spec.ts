import { ICreateArticleDTO } from "../../dtos/ICreateArticleDTO";
import { ArticlesRepositoryInMemory } from "../../infra/repositories/ArticlesRepositoryInMemory";
import { CreateArticleUseCase } from ".";

import { AppError } from "../../../../shared/errors/AppError";
import { StatusCodes } from "http-status-codes";

describe("CreateArticleUseCase", () => {
  it("should be able to create article", async () => {
    const articlesRepository = new ArticlesRepositoryInMemory();
    const createArticleUseCase = new CreateArticleUseCase(articlesRepository);

    const article = await createArticleUseCase.execute({
      title: "Chinese satellite propulsion startup secures funding as country’s constellation projects grow",
      url: "https://spacenews.com/chinese-satellite-propulsion-startup-secures-funding-as-countrys-constellation-projects-grow/",
      imageUrl: "https://spacenews.com/wp-content/uploads/2015/03/main_ionengine_full.jpg",
      newsSite: "SpaceNews",
      summary: "A Chinese satellite electric propulsion company has secured multi-million yuan angel round financing amid a proliferation of Chinese constellation plans.",
      publishedAt: "2022-05-16T12:43:41.000Z",
      featured: false,
      launches: [],
      events: []
    });

    expect(article).toHaveProperty("id");
    expect(article?.launches).toHaveLength(0);
  });
});

describe("CreateArticleUseCaseHandleExceptions", () => {
  it("should not be able to create article that already exist", async () => {
    const articlesRepository = new ArticlesRepositoryInMemory();
    const createArticleUseCase = new CreateArticleUseCase(articlesRepository);

    const article: ICreateArticleDTO = {
      title: "Chinese satellite propulsion startup secures funding as country’s constellation projects grow",
      url: "https://spacenews.com/chinese-satellite-propulsion-startup-secures-funding-as-countrys-constellation-projects-grow/",
      imageUrl: "https://spacenews.com/wp-content/uploads/2015/03/main_ionengine_full.jpg",
      newsSite: "SpaceNews",
      summary: "A Chinese satellite electric propulsion company has secured multi-million yuan angel round financing amid a proliferation of Chinese constellation plans.",
      publishedAt: "2022-05-16T12:43:41.000Z",
      featured: false,
      launches: [],
      events: []
    }

    await createArticleUseCase.execute(article);

    expect.assertions(3);

    try {
      await createArticleUseCase.execute(article);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toEqual("O artigo ja existe");
      expect(error.statusCode).toEqual(StatusCodes.CONFLICT);
    }
  });

  it("should not be able to create article with empty fields", async () => {
    const articlesRepository = new ArticlesRepositoryInMemory();
    const createArticleUseCase = new CreateArticleUseCase(articlesRepository);

    expect.assertions(3);

    try {
      await createArticleUseCase.execute({} as ICreateArticleDTO);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toEqual("Os campos sao obrigatorios");
      expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    }
  });
});