import { BadGatewayException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (existingUser) {
			throw new ConflictException('this email user already exists');
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);

		const newUser = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: hashedPassword,
			},
		});

		const { password, ...userWithoutPassword } = newUser;
		return userWithoutPassword;
	}
}
