import { Injectable } from '@nestjs/common';
import type { UserModel } from '@fullstack-monorepo-demo/shared';
import type { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  userModel: UserModel;
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.client.user.create({
      data,
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.client.user.findMany();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.client.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.client.user.delete({
      where: { id },
    });
  }
}  