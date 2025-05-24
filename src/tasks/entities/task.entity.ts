import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  status: 'pendente' | 'concluida';

  @Column()
  atribuidaPara: string; // userId

  @Column()
  casaId: string;

  @Column()
  dataLimite: Date;
}