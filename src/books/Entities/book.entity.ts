import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp.js';
import { AuthorEntity } from './author.entity.js';

@Entity('livre')
export class BookEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        //  name : "titre",
        type: 'varchar',
        length: 50,
        //unique: true,
        // update : true
    })
    title: string;

    @Column({
        type: 'int',
    })
    year: number;

    @Column({
        length: 100,
    })
    image: string;

    @Column()
    editor: string;

    @ManyToOne((type) => AuthorEntity, (e) => e.id)
    author;
}
