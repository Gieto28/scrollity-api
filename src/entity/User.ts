import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
  id: any;
}
