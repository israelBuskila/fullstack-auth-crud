import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  firstname!: string;

  @IsString()
  @MinLength(1)
  lastname!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}

export class UpdateUserDto {
    @IsString()
    @MinLength(1)
    firstname?: string;
  
    @IsString()
    @MinLength(1)
    lastname?: string;
  
    @IsEmail()
    email?: string;
  
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


