import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
	@IsString()
	@IsNotEmpty()
	name:	string;

	@IsEmail()
	@IsNotEmpty()
	email:	string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6, { message: 'パスワードは6文字以上で入力してください' })
	password:	string;
}
