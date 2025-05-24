import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bills.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  async create(dto: CreateBillDto, casaId: string) {
    const valorPorPessoa = +(dto.valorTotal / dto.divididaEntre.length).toFixed(2);
    const valoresIndividuais = Object.fromEntries(
      dto.divididaEntre.map(id => [id, valorPorPessoa])
    );

    const bill = this.billRepository.create({
      ...dto,
      casaId,
      status: 'pendente',
      valoresIndividuais,
    });

    return this.billRepository.save(bill);
  }

  findAllByCasaId(casaId: string) {
    return this.billRepository.find({ where: { casaId } });
  }

  async updateStatus(id: string, status: 'paga' | 'pendente') {
    const bill = await this.billRepository.findOne({ where: { id: new ObjectId(id) } });
    if (!bill) throw new Error('Conta não encontrada');
    bill.status = status;
    return this.billRepository.save(bill);
  }
}
