import { FilmInterface } from './../interfaces/film.interface';
import { Helper } from './../utils/helper';

export class FilmDTO implements FilmInterface{
    id: string;
    created: Date;    
    director: string;
    title: string;
    episode_id: number;
    opening_crawl: string;
    producer: string;
    release_date: Date;
    characters: number[];
    edited: string;

    constructor({created, 
                director, 
                title,
                episode_id, 
                opening_crawl,
                producer,
                release_date,
                edited,
                url
            }){
                    this.created = created;
                    this.director = director;
                    this.title = title;
                    this.episode_id = episode_id;
                    this.opening_crawl = opening_crawl;
                    this.producer = producer;
                    this.release_date = release_date;
                    this.edited = edited;
                    this.id = Helper.getFirstNumberOccurenceFromString(url);
    }

    setCharacter(characters: number[]){
        this.characters = characters;
    }
}