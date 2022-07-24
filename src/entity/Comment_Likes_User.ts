import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
@Unique("index", ["user", "comment"])
export class Comment_Likes_User {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, (user: User) => user.comment_likes)
  user: User;

  @ManyToOne(() => Comment, (comment: Comment) => comment.comment_likes)
  comment: Comment;

  @Column({ default: 0 })
  vote: number;

  @Column()
  date: Date;
}
