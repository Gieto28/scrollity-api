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
  up_votes: number;

  @Column()
  down_votes: number;

  @Column()
  dateCreated: Date;

  @ManyToOne(() => User, (user) => user._id)
  creator: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];
}
