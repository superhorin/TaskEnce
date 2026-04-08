import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './auth.repository';
import { RedisModule } from 'src/redis/redis.module';
import { HybridAuthGuard } from './hybrid-auth.guard';

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
    HybridAuthGuard,
  ],
  controllers: [AuthController],
  exports: [JwtModule, AuthRepository, RedisModule, HybridAuthGuard],
})
export class AuthModule {}
