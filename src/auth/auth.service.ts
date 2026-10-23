import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { Repository } from 'typeorm'; ``
import * as bcrypt from "bcrypt"
import { Roles } from './generics/role.enum.js';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {

    }

    async signup(infos) {
        let assignedRole;
        if (await this.userRepo.count() == 0)
            assignedRole = Roles.ROLE_ADMIN;
        else
            assignedRole = Roles.ROLE_USER
        let newEntity = await this.userRepo.create(
            {
                email: infos.email,
                username: infos.username,
                salt: await bcrypt.genSalt(),
                role: assignedRole
            }
        )
        newEntity.password = await bcrypt.hash(infos.password, newEntity.salt)
        const res = await this.userRepo.save(newEntity);
        return res;
    }
}
