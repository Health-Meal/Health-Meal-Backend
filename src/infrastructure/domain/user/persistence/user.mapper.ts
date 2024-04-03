import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { User } from '../../../../application/domain/user/domain/user';

@Injectable()
export class UserMapper {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async toDomain(entity: UserEntity): Promise<User> {
        return entity
            ? new User(
                entity.email,
                entity.password,
                entity.name,
                entity.loginType,
                entity.id
            ) : null;
    }

    toEntity(domain: User): UserEntity {
        return new UserEntity(
            domain.id,
            domain.email,
            domain.password,
            domain.name,
            domain.loginType
        );
    }
}