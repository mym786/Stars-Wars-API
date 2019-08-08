import { ApiModelProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CommentDto {
    @Length(1, 500)
    @ApiModelProperty()
    readonly comment: string;

    ip: string;
    filmId: string;
    filmName: string;
}