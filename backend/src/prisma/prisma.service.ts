import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	private readonly logger = new Logger(PrismaService.name);
	constructor(private configService: ConfigService) {
		const dbUrl = configService.get<string>('DATABASE_URL');

		const pool = new Pool({ connectionString: dbUrl });
		const adapter = new PrismaPg(pool);

		super({ adapter });
	}

	async onModuleInit() {
		await this.$connect();
		this.logger.log('Prisma connection!!!!!!!!!!!!!!!');
	}
}
