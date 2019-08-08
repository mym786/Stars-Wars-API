import { ApiModelPropertyOptional } from "@nestjs/swagger";

export class CharacterQueryParams {
    @ApiModelPropertyOptional()
    gender: string;
    
    @ApiModelPropertyOptional({
        description: 'Attribute to sort by',
        enum: ['name', 'gender', 'height']
    })
    sortBy: string;

    @ApiModelPropertyOptional({
        enum: ['desc', 'asc'],
        description: 'Sorting order ascending or descending'
    })
    order: string;
  }