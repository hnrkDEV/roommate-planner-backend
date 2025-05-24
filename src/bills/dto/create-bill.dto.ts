import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsArray()
  divididaEntre: string[]; // lista de userIds
}
