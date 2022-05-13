export interface IArticle {
  readonly id?: number;
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newSite: string;
  summary: string;
  publishedAt: string;
  launches: ILaunchesAndEventsProps[];
  events: ILaunchesAndEventsProps[];
}

export interface ILaunchesAndEventsProps {
  id: string;
  provider: string;
}
