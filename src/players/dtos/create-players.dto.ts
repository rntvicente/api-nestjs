import { IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator';

export class CreatePlayerDto {
  @IsMobilePhone('pt-BR')
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;
}
