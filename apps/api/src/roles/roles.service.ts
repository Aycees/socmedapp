import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createRoleDto: CreateRoleDto) {
    try {
      const newRole = await this.prismaService.role.create({
        data: {
          ...createRoleDto
        }
      })

      return newRole
    } catch (error) {
      console.error(error)
    };
  }

  async findAll() {
    try {
      const roles = await this.prismaService.role.findMany({
        where: {
          isArchived: false
        }
      })

      if (!roles) {
        throw new HttpException('No roles found', HttpStatus.NOT_FOUND);
      }

      return roles;
    } catch (error) {
      console.error(error)
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
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      return role;
    } catch (error) {
      console.error(error)
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
      console.error(error)
    }
  }

  async archive(id: string) {
    try {
      const archivedRole = await this.prismaService.role.update({
        where: { id },
        data: { isArchived: true }
      })

      return archivedRole;
      
    } catch (error) {
      console.error(error)
    }
  }
}
