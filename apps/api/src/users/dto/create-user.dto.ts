import { IsEmail, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    id: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsString()
    avatarUrl: string;

    @IsString()
    role: string;

    @IsBoolean()
    isArchived: boolean;
}
