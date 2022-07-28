import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./Comment";
import { Comment_Likes_User } from "./Comment_Likes_User";
import { Notification } from "./Notification";
import { Post } from "./Post";
import { Post_Likes_User } from "./Post_Likes_User";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({
    nullable: true,
  })
  picture: string | null;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  dateCreated: Date;

  @Column()
  dateEdited: Date;

  @OneToMany(() => Post, (post: Post) => post.user, { onDelete: "CASCADE" })
  posts: Post[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user, {
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @OneToMany(
    () => Post_Likes_User,
    (post_likes_user: Post_Likes_User) => post_likes_user.post,
    { onDelete: "CASCADE" }
  )
  likes: Post[];

  @OneToMany(
    () => Comment_Likes_User,
    (comment_likes_user: Comment_Likes_User) => comment_likes_user.user,
    {
      onDelete: "CASCADE",
      cascade: true,
    }
  )
  comment_likes: User[];

  @OneToMany(
    () => Notification,
    (notification: Notification) => notification.user,
    { onDelete: "CASCADE" }
  )
  notifications: Notification[];
}
