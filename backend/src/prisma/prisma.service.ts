import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	private readonly logger = new Logger(PrismaService.name);
	constructor() {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		const adapter = new PrismaPg(pool);

		super({ adapter });
	}

	async onModuleInit() {
		this.logger.log('Prisma connection!!!!!!!!!!!!!!!');
		await this.$connect();
	}
}
