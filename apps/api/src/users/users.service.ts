import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private userPublicSelect = {
    id: true,
    username: true,
    email: true,
    name: true,
    bio: true,
    role: true,
    avatarUrl: true,
    isArchived: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(createUserDto.password, salt);

      const newUser = await this.prismaService.user.create({
        data: {
          createUserDto,
          password,
        },
        select: this.userPublicSelect,
      });

      return newUser

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const allUsers = await this.prismaService.user.findMany({
        where: {
          isArchived: false
        },
        select: this.userPublicSelect
      });

      if (!allUsers) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      return allUsers;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
      const findUser = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: this.userPublicSelect
      });

      if (!findUser) {
        throw new NotFoundException('User not found')
      }

      return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          updateUserDto
        }
      })

      return updateUser;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async archive(id: string) {
    try {
      const user = await this.findOne(id);
      const { isArchived, ...userData } = user.data;
      
      const archiveUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          ...userData,
          isArchived: !isArchived,
        }
      })
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
