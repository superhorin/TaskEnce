import { Priority, Difficulty, Duration } from "@prisma/client";
import { IsString, IsOptional, IsEnum, IsNotEmpty, IsInt, Min } from "class-validator";

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	title:			string;

	@IsOptional()
	@IsString()
	description?:	string;

	@IsOptional()
	@IsEnum(Difficulty)
	difficulty?:	Difficulty;

	@IsOptional()
	@IsEnum(Duration)
	duration?:		Duration;

	@IsOptional()
	@IsInt()
	@Min(0)
	progress?:		number;

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
