import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTeamDto {
	@IsString()
	@IsNotEmpty()
	name:		string;

	@IsOptional()
	@IsString()
	iconUrl:	string
}

export class InviteUserDto {
	@IsString()
	@IsNotEmpty()
	teamId:		string

	@IsString()
	@IsNotEmpty()
	userId:		string
}
