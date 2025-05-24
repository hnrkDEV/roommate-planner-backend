import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class House {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nome: string;

  @Column('simple-array')
  membros: string[]; // Lista de userIds

  @Column({ default: new Date() })
  criadaEm: Date;
}