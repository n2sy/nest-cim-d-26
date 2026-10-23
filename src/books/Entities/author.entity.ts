import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimeStamp } from "../generics/timestamp.js";
import { BookEntity } from "./book.entity.js";

@Entity('auteur')
export class AuthorEntity extends TimeStamp {

    @PrimaryGeneratedColumn()
    id;

    @Column(
        {
            type: "varchar",
            length: 30,

        }
    )
    prenom;

    @Column()
    nom: string;

    // Facultative
    // @OneToMany(type => BookEntity, e => e.id)
    // listeLivres;
}
