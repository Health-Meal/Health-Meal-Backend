import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/persistence/user.entity';
import { UserPort } from '../../../application/domain/user/spi/user.spi';
import { UserPersistenceAdapter } from '../../domain/user/persistence/user.persistence.adapter';
import { UserMapper } from '../../domain/user/persistence/user.mapper';
import { JwtStrategy } from '../jwt/jwt.strategy';

const USER_PORT = { provide: UserPort, useClass: UserPersistenceAdapter };
const USER_REPOSITORY = TypeOrmModule.forFeature([UserEntity]);

@Global()
@Module({
    imports: [USER_REPOSITORY],
    controllers: [],
    providers: [
        USER_PORT,
        UserMapper,
    ],
    exports: [USER_PORT, USER_REPOSITORY]
})
export class UserModule {
}