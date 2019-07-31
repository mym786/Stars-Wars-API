import { ApiModelProperty } from '@nestjs/swagger';

export class CommentDto {
    @ApiModelProperty()
    readonly comment: string;
    @ApiModelProperty()
    ip: string;
    @ApiModelProperty()
    filmId: string;
    @ApiModelProperty()
    filmName: string;
}