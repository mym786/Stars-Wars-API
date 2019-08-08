import { Injectable } from '@nestjs/common';

import { StarWarsAPI } from './../services';
import { CacheService } from './../services/cache-service';
import { CharacterManager } from './../managers/character-manager'
import { Helper } from './../utils/helper';

import { CommentDto } from './../dto/comment.dto';
import { getManager } from "typeorm";

import { Comment } from './../db/entities/comment.entities';

import envprovider from './../utils/env-provider';
import { FilmInterface } from './../interfaces/film.interface';
import { CharacterInterface } from './../interfaces/character.interface';

@Injectable()
export class FilmManager {
    constructor(private readonly starWarsAPI: StarWarsAPI, private cacheService: CacheService, private characterManager: CharacterManager) {}

    async getFilmsSortedByReleaseAndComments(): Promise<any> {
        let films = await this.getFilms();

        const commentsMap = await this.getFilmCommentsCount();
        films = films.map((film) => {
            const { id } = film;
            film['number_of_comments'] = (commentsMap[id] && commentsMap[id].count) || 0;
            return film;
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
        if( await this.cacheService.isKey(envprovider.SYSTEM_CONSTANTS.FILM_CACHE_KEY, null) ){
            const films = await this.cacheService.get(envprovider.SYSTEM_CONSTANTS.FILM_CACHE_KEY, null);
            return Object.values(films);
        }
        const films = await this.starWarsAPI.getFilms();

        // set in cache but first create key-value 
        const filmsMap = Helper.toSet(films, 'id');
        this.cacheService.set(envprovider.SYSTEM_CONSTANTS.FILM_CACHE_KEY, filmsMap, null);
        return films;
    }

    async getFilmCharacters(id): Promise<CharacterInterface[]>{
        const film = await this.getFilm(id);
        if(!film)
            throw new Error(`Film with ${id} cannot be found`);
        const charactersIds = film.characters && film.characters.map(Helper.getFirstNumberOccurenceFromString);
        if(!charactersIds)
            return [];
        else
            return await this.characterManager.getCharactersByIds(charactersIds)
        
    }

    async getFilmCommentsCount(){
        const query = await getManager().query(`SELECT film_id, COUNT(*) as count FROM ${envprovider.DB_ENVS.COMMENT_TABLE_NAME} group by film_id`);
        return Helper.toSet(query, 'film_id');
    }

    async getFilmComments(id){
        const comments = await getManager().find(Comment,{
            where:{
                film_id: id
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
