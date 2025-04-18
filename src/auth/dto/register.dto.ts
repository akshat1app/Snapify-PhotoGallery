import { IsString, IsEmail, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;


  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
