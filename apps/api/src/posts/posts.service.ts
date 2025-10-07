import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    try {

      const { userId, ...postData } = createPostDto;
      const post = await this.prismaService.post.create({
        data: {
          ...postData,
          user: {
            connect: {
              id: userId
            },
          },
        },
      }) ;

      return post;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const allPosts = await this.prismaService.post.findMany({
        where: { isArchived: false},
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatarUrl: true
            }
          }
        }
      });

      return allPosts;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const findPost = await this.prismaService.post.findUniqueOrThrow({
        where: { id },
      });

      if (!findPost) {
        throw new NotFoundException('Post not found')
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.prismaService.post.update({
        where: { id, isArchived: false },
        data: { ...updatePostDto }
      })

      return updatedPost;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async archive(id: string) {
    try {
      await this.findOne(id);

      const archivePost = await this.prismaService.post.update({
        where: { id },
        data: {
          isArchived: true
        }
      })

      return archivePost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async unarchive(id: string) {
    try {
      await this.findOne(id);

      const unarchivePost = await this.prismaService.post.update({
        where: { id },
        data: {
          isArchived: false
        }
      })

      return unarchivePost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
