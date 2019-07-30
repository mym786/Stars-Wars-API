import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommentDto } from './../../dto/comment.dto';

import envProvider from './../../utils/env-provider';

@Entity({
  name: envProvider.DB_ENVS.COMMENT_TABLE_NAME,
  synchronize: true
})
export class Comment {

  static createComment(commentDTO: CommentDto){
    const c = new Comment();
    c.comment = commentDTO.comment;
    c.ip = commentDTO.ip;
    c.filmId = commentDTO.filmId;
    c.film = commentDTO.filmName;
    return c;
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  comment: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  ip: string;

  @Column({
    type: 'text',
    nullable: true
  })
  film: string;

  @Column('text')
  filmId: string;

  @Column({
    type: 'int',
    default: 0,
  })
  views: number;

  @Column({
    type: 'boolean',
    default: true
  })
  isPublished: boolean;
}