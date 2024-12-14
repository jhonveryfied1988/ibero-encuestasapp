import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { SurveyModule } from './survey/survey.module';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [UserModule, SurveyModule, AuthModule, ResponseModule, ],
  providers: [PrismaService],
})
export class AppModule {}
