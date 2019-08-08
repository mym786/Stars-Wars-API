import { Injectable } from '@nestjs/common';

import { CacheService } from './../services/cache-service';

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