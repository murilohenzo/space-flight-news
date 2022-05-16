import { container } from "tsyringe";

import { IArticlesRepository } from "../../modules/aritcles/infra/repositories/IArticlesRepository";
import { ArticlesRepository } from "../../modules/aritcles/infra/repositories/implements/ArticlesRepository";

container.registerSingleton<IArticlesRepository>(
  "ArticlesRepository",
  ArticlesRepository
)