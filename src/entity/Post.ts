import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Comment } from "./Comment";
import { Post_Likes_User } from "./Post_Likes_User";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  media_id: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  category: string;

  @Column({ default: 0 })
  up_votes: number;

  @Column({ default: 0 })
  down_votes: number;

  @Column()
  dateCreated: Date;

  @ManyToOne(() => User, (user: User) => user.posts, {
    cascade: true,
  })
  user: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(
    () => Post_Likes_User,
    (post_likes_user: Post_Likes_User) => post_likes_user.post,
    {
      cascade: true,
    }
  )
  likes: Post[];
}
