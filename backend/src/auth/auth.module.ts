import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './auth.repository';
import { RedisModule } from 'src/redis/redis.module';
import { WebAuthController, ApiAuthController } from './auth.controller';
import { CookieAuthGuard } from './cookie-auth.guard';
import { TokenAuthGuard } from './token-auth.guard';

@Module({
  imports: [
    PrismaModule, RedisModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthRepository,
    CookieAuthGuard,
    TokenAuthGuard,
  ],
  controllers: [WebAuthController, ApiAuthController],
  exports: [JwtModule, AuthRepository, RedisModule, CookieAuthGuard, TokenAuthGuard, AuthService],
})
export class AuthModule {}
