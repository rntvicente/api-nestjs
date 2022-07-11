import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { Event } from '../interfaces/categories.interface';

export class UpdateCategoriesDto {
  @IsString()
  @IsOptional()
  @Length(10, 20)
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  events: Event[];
}
