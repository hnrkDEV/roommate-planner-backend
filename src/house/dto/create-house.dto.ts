import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateHouseDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsArray()
  @ArrayMinSize(1)
  membros: string[]; // userIds obrigatórios
}