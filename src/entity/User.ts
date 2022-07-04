import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({
    nullable: true,
  })
  picture: string | null;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  dateCreated: Date;

  @Column()
  dateEdited: Date;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];

  @ManyToMany(() => Post, (post: Post) => post.likes)
  likes: Post[];
}
