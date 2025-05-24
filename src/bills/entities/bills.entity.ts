import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Bill {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  nome: string;

  @Column('double')
  valorTotal: number;

  @Column()
  casaId: string;

  @Column()
  status: 'paga' | 'pendente';

  @Column('simple-array')
  divididaEntre: string[]; // lista de userIds

  @Column('json')
  valoresIndividuais: Record<string, number>; // { userId: valor }
}