import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';

@Module({
  providers: [SurveyService, PrismaService],
  controllers: [SurveyController],
})
export class SurveyModule {}
