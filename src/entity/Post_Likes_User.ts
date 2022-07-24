import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@Unique("index", ["user", "post"])
export class Post_Likes_User {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, (user: User) => user.likes, {
    cascade: true,
    onUpdate: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Post, (post: Post) => post.likes, {
    cascade: true,
    onUpdate: "CASCADE",
  })
  post: Post;

  @Column({ default: 0 })
  vote: number;

  @Column()
  date: Date;
}
