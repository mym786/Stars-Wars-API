import { Injectable } from '@nestjs/common';

import { StarWarsAPI } from './../services';
import { CacheService } from './../services/cache-service';
import { Helper } from './../utils/helper';

import { Comment } from './../db/entities/comment.entities';

import {getManager} from "typeorm";


@Injectable()
export class CommentsManager {
    constructor(private cacheService: CacheService) {}

    //FIXME : Add Cache
    async getAllComments(){
        return await getManager().find(Comment, {order: {
            created_at: "DESC",
        }})
    }

}