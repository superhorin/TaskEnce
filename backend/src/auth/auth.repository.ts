import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	async	find(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id: id },
		});
	}

	async	findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {email: email},
		});
	}

	async	create(data: any): Promise<User> {
		return this.prisma.user.create({
			data: data,
		})
	}
}