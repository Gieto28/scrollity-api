import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  title: string;

  @Column()
  media: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ default: 0 })
  up_votes: number;

  @Column({ default: 0 })
  down_votes: number;

  @Column()
  dateCreated: Date;

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];
}
