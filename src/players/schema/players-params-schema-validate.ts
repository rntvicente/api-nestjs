import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export class PlayersParamsSchemaValidade implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`Missing param: ${metadata.data}.`);
    }

    return value;
  }
}
