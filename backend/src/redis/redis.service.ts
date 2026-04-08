import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
	constructor(private readonly configService: ConfigService) {
		const redisUrl = configService.get<string>('REDIS_URL');
		super(redisUrl || 'redis://localhost:6379');
	}

	onModuleDestroy() {
		this.disconnect();
	}
}
