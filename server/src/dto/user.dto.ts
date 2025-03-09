import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  firstname!: string;

  @IsString()
  @MinLength(1)
  lastname!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    firstname?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    lastname?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
  }

  export class LoginUserDto {
    @IsEmail()
    email!: string;
  
    @IsString()
    @MinLength(6)
    password!: string;
  }


