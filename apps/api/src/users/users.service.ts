import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private userPublicSelect = {
    id: true,
    username: true,
    email: true,
    name: true,
    bio: true,
    roleId: true,
    avatarUrl: true,
    isArchived: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  async create(createUserDto: CreateUserDto) {
    try {
      await Promise.all([
        this.isUsernameTaken(createUserDto.username),
        this.isEmailRegistered(createUserDto.email)
      ]);

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(createUserDto.password, salt);

      const { roleId, ...userData } = createUserDto;
      const newUser = await this.prismaService.user.create({
        data: {
          ...userData,
          password: password,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
        select: this.userPublicSelect,
      });

      return newUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const allUsers = await this.prismaService.user.findMany({
        where: {
          isArchived: false,
        },
        select: this.userPublicSelect,
      });
      return allUsers;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const findUser = await this.prismaService.user.findUniqueOrThrow({
        where: { id, isArchived: false },
        select: this.userPublicSelect,
      });

      if (!findUser) {
        throw new NotFoundException('User not found');
      }
      return findUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { roleId, ...userData } = updateUserDto;
      const updateUser = await this.prismaService.user.update({
        where: { id },
        data: {
          ...userData,
          ...(roleId && {
            role: {
              connect: { id: roleId },
            },
          }),
        },
        select: this.userPublicSelect,
      });

      return updateUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async archive(id: string) {
    try {
      await this.findOne(id);

      const archiveUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          isArchived: true,
        },
        select: this.userPublicSelect,
      });

      return archiveUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  private async isUsernameTaken(username: string): Promise<void> {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        username,
        isArchived: false
      }
    });

    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }
  }
  
  private async isEmailRegistered(email: string): Promise<void> {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        email,
        isArchived: false
      }
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }
  }

}
