import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  dateCreated: Date;

  @Column({ default: false })
  seen: boolean;

  @ManyToOne(() => User, (user: User) => user.notifications)
  user: User;
}
