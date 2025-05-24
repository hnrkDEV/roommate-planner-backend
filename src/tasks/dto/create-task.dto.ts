import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsDateString()
  dataLimite: string;

  @IsOptional()
  @IsString()
  atribuidaPara?: string;
}