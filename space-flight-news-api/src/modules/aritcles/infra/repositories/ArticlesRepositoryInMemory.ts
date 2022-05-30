import { Article } from "../orm/entities/Article";
import { IArticlesRepository } from "./IArticlesRepository";

export class ArticlesRepositoryInMemory implements IArticlesRepository {
  private articles: Article[] = [];

  async create(article: Article): Promise<Article | undefined> {
    const articleObj = new Article();
    const id = this.articles.length + 1;

    Object.assign(articleObj, { id }, article);
    this.articles.push(articleObj);

    return articleObj;
  }

  async findAll(take: number, page: number): Promise<Article[] | undefined> {
    return this.articles.slice((page - 1) * take, page * take);
  }

  async findById(id: number): Promise<Article | undefined> {
    return this.articles.find((article) => article.id === id);
  }

  async findByTitle(title: string): Promise<Article | undefined> {
    return this.articles.find((article) => article.title === title);
  }

  async update(id: number, article: Article): Promise<Article | undefined> {
    const existArticle = this.articles.find((article) => article.id === id);

    if (existArticle !== undefined) {
      existArticle.featured = article.featured || existArticle.featured;
      existArticle.title = article.title || existArticle.title;
      existArticle.url = article.url || existArticle.url;
      existArticle.imageUrl = article.imageUrl || existArticle.imageUrl;
      existArticle.newsSite = article.newsSite || existArticle.newsSite;
      existArticle.summary = article.summary || existArticle.summary;
      existArticle.publishedAt = article.publishedAt || existArticle.publishedAt;
      existArticle.launches = article.launches || existArticle.launches;
      existArticle.events = article.events || existArticle.events;

      return existArticle;
    }
    return {} as Article;
  }

  async delete(id: number): Promise<void> {
    this.articles = this.articles.filter(
      (article) => article.id !== id
    );
  }
  
}