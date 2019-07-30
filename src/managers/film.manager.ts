import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { StarWarsAPI } from './../services';
import { CacheService } from './../services/cache-service';
import { Helper } from './../utils/helper';

import { CommentDto } from './../dto/comment.dto';
import {getManager} from "typeorm";

import { Comment } from './../db/entities/comment.entities';

import envprovider from './../utils/env-provider';
import { FilmInterface } from './../interfaces/film.interface';

@Injectable()
export class FilmManager {
    constructor(private readonly starWarsAPI: StarWarsAPI, private cacheService: CacheService) {}

    async getFilmsSortedByReleaseAndComments(): Promise<any> {
        let films = await this.getFilms();

        const commentsMap = await this.getFilmCommentsCount();
        films = films.map((f) => {
            const { id } = f;
            f['number_of_comments'] = (commentsMap[id] && commentsMap[id].count) || undefined;
            return f;
        })
        return films.sort(Helper.sorter('release_date', {
            type: 'date',
            typeFormat: 'YYYY-MM-DD',
            asc: true
        }));
    }

    async getFilm(id): Promise<FilmInterface>{
        const films = await this.getFilms();
        return films.filter(f => f.id == id).shift();
    }

    async getFilms(): Promise<any>{
        if( this.cacheService.isKey(envprovider.SYSTEM_CONSTANTS.FILM_CACHE_KEY) ){
            const films = this.cacheService.get(envprovider.SYSTEM_CONSTANTS.FILM_CACHE_KEY);
            return Object.values(films);
        }
        const films = await this.starWarsAPI.getFilms();

        // set in cache but first create key-value 
        const filmsMap = Helper.toSet(films, 'id');
        this.cacheService.set(envprovider.SYSTEM_CONSTANTS.FILM_CACHE_KEY, filmsMap);
        return films;
    }

    async getFilmCommentsCount(){
        const query = await getManager().query(`SELECT filmId, COUNT(*) as count FROM ${envprovider.DB_ENVS.COMMENT_TABLE_NAME} group by filmId`);
        return Helper.toSet(query, 'filmId');
    }

    async getFilmComments(id){
        const comments = await getManager().find(Comment,{
            where:{
                filmId: id
            }
        })
        return comments;
    }

    async addComment(commentDto : CommentDto){
        const c = Comment.createComment(commentDto);
        const entityManager = getManager(); // you can also get it via getConnection().manager
        return await entityManager.save(c);
    }

}
