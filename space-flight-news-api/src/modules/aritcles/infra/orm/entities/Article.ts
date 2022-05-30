import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

interface ILaunchesAndEventsProps {
  id: string;
  provider: string;
}

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
  newsSite: string;
  
  @Column()
  summary: string;

  @Column()
  publishedAt: string;

  @Column()
  updatedAt: string;

  @Column("jsonb", { array: true })
  launches: ILaunchesAndEventsProps[];

  @Column("jsonb", { array: true })
  events: ILaunchesAndEventsProps[];
}
