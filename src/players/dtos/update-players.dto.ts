import { IsNotEmpty, IsMobilePhone } from 'class-validator';

export class UpdatePlayerDto {
  @IsMobilePhone('pt-BR')
  readonly phoneNumber: string;

  @IsNotEmpty()
  readonly name: string;
}
