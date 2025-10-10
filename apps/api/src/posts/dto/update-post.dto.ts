import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePostDto  {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
    deleteImageIds?: string[];
}
