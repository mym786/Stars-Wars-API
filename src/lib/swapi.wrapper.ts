import * as swapi from 'swapi-node';

export class SwapiWrapper {
    async getFilms(){
        const films = [];
        let film = await swapi.getFilm(null);
        await this._recurse(films, film);
        return films;
    }

    async getPeoples(){
        const characters = [];
        let person = await swapi.getPerson(null);
        await this._recurse(characters, person);
        return characters;
    }

    async getPeople(id){
        const person = await swapi.getPerson(id);
        return person.results;
    }

    async _recurse(obj: Array<any> , handler){
        obj.push(...handler.results);
        if(handler.next){
            handler = await handler.getNext();
            return this._recurse(obj,handler);
        }
        return obj;
    }
}