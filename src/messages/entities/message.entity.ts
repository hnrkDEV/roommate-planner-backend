import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Message {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  texto: string;

  @Column()
  remetenteId: string;

  @Column()
  casaId: string;

  @Column()
  data: Date;
}
