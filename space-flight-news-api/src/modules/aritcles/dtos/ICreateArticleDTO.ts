export interface ICreateArticleDTO {
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  launches?: ILaunchesAndEventsProps[];
  events?: ILaunchesAndEventsProps[];
}

export interface ILaunchesAndEventsProps {
  id: string;
  provider: string;
}