import { Priority, Prisma } from "@prisma/client";
import { IsString, IsOptional, IsEnum, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	title:			string;

	@IsOptional()
	@IsString()
	description?:	string;

	@IsOptional()
	@IsEnum(Priority)
	priority?:		Priority;

	@IsOptional()
	@IsString()
	assigneeId?:	string;

	@IsOptional()
	@IsString()
	teamId?:		string;
}
