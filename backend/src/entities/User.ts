// Defining model with TypeORM
// A model is essentially a class that extends BaseEntity  and that BaseEntity allows us to interact/mutate/query  with a specific table in our database.
// With TypeORM, we  define our database models with classes and decorators.

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  age!: number;
}
