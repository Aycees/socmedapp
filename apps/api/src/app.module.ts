import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PrismaModule, UsersModule, RolesModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
