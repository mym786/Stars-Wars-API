import { ApiModelProperty } from '@nestjs/swagger';

export class CommentDto {
    @ApiModelProperty()
    readonly comment: string;
    ip: string;
    filmId: string;
    filmName: string;
}