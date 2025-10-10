import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-';
          const originalName = file.originalname.replace(/\s+/g, '-');
          const filename = `${uniqueSuffix}-${originalName}`;
          callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
