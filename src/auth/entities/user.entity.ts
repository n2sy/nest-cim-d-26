import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../generics/role.enum.js";
import { TimeStamp } from "../../books/generics/timestamp.js";

@Entity("user")
export class UserEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id;

    @Column(
        {
            type: "varchar",
            unique: true,
            nullable: false
        }
    )
    email;

    @Column(
        {
            type: "varchar",

            unique: true,
            nullable: false
        }
    )
    username;

    @Column({
        nullable: true
    })
    password: string
    @Column()
    salt: string

    @Column({
        type: "enum",
        enum: Roles,

    })
    role;

}
