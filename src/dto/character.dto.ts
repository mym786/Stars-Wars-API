import { CharacterInterface } from './../interfaces/character.interface';
import { Helper } from './../utils/helper';

export class CharacterDTO implements CharacterInterface{
    id: string;
    created: Date;
    edited: string;
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: number[];

    constructor({name, 
                birth_year, 
                eye_color,
                gender, 
                hair_color,
                height,
                mass,
                skin_color,
                created,
                edited,
                url
            }){
                this.id = Helper.getFirstNumberOccurenceFromString(url);
                this.name = name;
                this.birth_year = birth_year;
                this.eye_color = eye_color;
                this.gender = gender;
                this.hair_color = hair_color;
                this.height = height;
                this.mass = mass;
                this.skin_color = skin_color;
                this.created = created;
                this.edited = edited;
    }

    setFilms(films: number[]){
        this.films = films;
    }
}