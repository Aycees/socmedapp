import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 5))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      createPostDto.images = files.map((file) => file.path);
    }
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // @Patch('update/:id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(id, updatePostDto);
  // }

  @Patch('archive/:id')
  archive(@Param('id') id: string) {
    return this.postsService.archive(id);
  }

  @Patch('unarchive/:id')
  unarchive(@Param('id') id: string) {
    return this.postsService.unarchive(id);
  }
}
