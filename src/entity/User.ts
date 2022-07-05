import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];

  @OneToMany(
    () => Post_Likes_User,
    (post_likes_user: Post_Likes_User) => post_likes_user.user,
    {
      cascade: true,
    }
  )
  likes: User[];
}
