import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5, {message: "You can only upload up to five images." }) 
  newImages?: string[];
}
