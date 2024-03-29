import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateKeywordPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        if (metadata.type !== 'query') {
            return value;
        }

        const keyword = value;
        if (typeof keyword !== 'string' || keyword.trim() === '') {
            throw new BadRequestException('keyword must be a non-empty string');
        }

        return value;
    }
}