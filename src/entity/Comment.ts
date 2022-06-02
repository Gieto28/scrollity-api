import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  user_id: number;

  @Column()
  comment: string;

  @Column()
  dateCreated: Date;

  @Column()
  up_votes: number;

  @Column()
  down_votes: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
