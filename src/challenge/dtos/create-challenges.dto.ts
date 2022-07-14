import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator'
export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDate: Date

  @IsNotEmpty()
  @IsMongoId()
  challenger: string

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<string>
}
