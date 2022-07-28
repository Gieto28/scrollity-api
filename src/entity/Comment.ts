import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Comment_Likes_User } from "./Comment_Likes_User";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  comment: string;

  @Column()
  dateCreated: Date;

  @Column({ default: 0 })
  up_votes: number;

  @Column({ default: 0 })
  down_votes: number;

  @ManyToOne(() => Post, (post: Post) => post.comments, { onDelete: 'CASCADE',})
  post: Post;

  @ManyToOne(() => User, (user: User) => user.comments, { onDelete: 'CASCADE',})
  user: User;

  @OneToMany(
    () => Comment_Likes_User,
    (comment_likes_user: Comment_Likes_User) => comment_likes_user.user,
    { 
      onDelete: 'CASCADE',
      cascade: true,
    }
  )
  comment_likes: Comment[];
}
