// libs
import { Injectable } from '@nestjs/common';
import { SwapiWrapper } from './../lib/swapi.wrapper';

// helpers
import { Helper } from './../utils/helper';

// interfaces and dtos
import { FilmInterface } from './../interfaces/film.interface';
import { CharacterInterface } from './../interfaces/character.interface';
import { FilmDTO } from './../dto/film.dto';
import { CharacterDTO } from './../dto/character.dto';


@Injectable()
export class StarWarsAPI {

  async getFilms(): Promise<FilmInterface[]> {
    const films = await new SwapiWrapper().getFilms();
    const filmsDto = films.map((film) => {
      return this._formatFilm(film);
    });
    return filmsDto;
  }

  async getCharacters(): Promise<CharacterInterface[]> {
    const characters = await new SwapiWrapper().getPeoples();
    const charactersDto = characters.map((character) => {
      return this._formatCharacter(character);
    });
    return charactersDto;
  }

  async getCharacter(id): Promise<CharacterInterface> {
    const character = await new SwapiWrapper().getPeople(id);
    return this._formatCharacter(character);
  }

  _formatFilm(film): FilmInterface{
    const filmDTO = new FilmDTO(film);
    const characters = film.characters.map(c => Helper.getFirstNumberOccurenceFromString(c));
    filmDTO.setCharacter(characters);
    return filmDTO;
  }

  _formatCharacter(character): CharacterInterface {
    character.character_id = Helper.getFirstNumberOccurenceFromString(character.url);
    const characterDTO = new CharacterDTO(character);
    const films = character.films.map(f => Helper.getFirstNumberOccurenceFromString(f));
    characterDTO.setFilms(films);
    return character;
  }
}