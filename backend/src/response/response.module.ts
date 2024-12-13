import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';

@Module({
  providers: [ResponseService, PrismaService],
  controllers: [ResponseController],
})
export class ResponseModule {}
