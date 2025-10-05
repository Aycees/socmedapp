import { HttpException, Injectable, HttpStatus, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createRoleDto: CreateRoleDto) {
    try {
      await Promise.all([
        this.roleExists(createRoleDto.name)
      ]);

      const newRole = await this.prismaService.role.create({
        data: {
          ...createRoleDto
        }
      })

      return newRole;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    };
  }

  async findAll() {
    try {
      const roles = await this.prismaService.role.findMany({
        where: {
          isArchived: false
        }
      })
      return roles;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    };
  }

  async findOne(id: string) {
    try {
      const role = await this.prismaService.role.findUnique({
        where: { 
          id,
          isArchived: false 
        }
      })

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      return role;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const updatedRole = await this.prismaService.role.update({
        where: { id },
        data: { ...updateRoleDto }
      })

      return updatedRole;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async archive(id: string) {
    try {
      await this.findOne(id);

      const archivedRole = await this.prismaService.role.update({
        where: { id },
        data: { isArchived: true }
      })

      return archivedRole;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  private async roleExists(name: string): Promise<void> {
    const existingRole = await this.prismaService.role.findFirst({
      where: { name, isArchived: false }
    })

    if (existingRole) {
      throw new ConflictException('Role already exists');
    }
  }
}
