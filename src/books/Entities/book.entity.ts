import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp.js';

@Entity('livre')
export class BookEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    //  name : "titre",
    type: 'varchar',
    length: 50,
    unique: true,
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
}
