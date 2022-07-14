import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'

import { Event } from '../interfaces/categories.interface'

export class CreateCategoriesDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 1)
  readonly category: string

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  description: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  events: Event[]
}
