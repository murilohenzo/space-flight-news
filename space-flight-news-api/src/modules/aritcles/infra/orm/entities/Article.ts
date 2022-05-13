import { ILaunchesAndEventsProps } from "modules/aritcles/domain/article";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  featured: boolean;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  imageUrl: string;

  @Column()
  newSite: string;
  
  @Column()
  summary: string;

  @Column()
  publishedAt: string;

  @Column("jsonb", { array: true })
  launches: ILaunchesAndEventsProps[];

  @Column("jsonb", { array: true })
  events: ILaunchesAndEventsProps[];
}
