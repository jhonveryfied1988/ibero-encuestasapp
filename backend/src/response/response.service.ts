import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async submitResponse(userId: string, surveyId: string, answers: any) {
    return this.prisma.response.create({
      data: {
        userId,
        surveyId,
        answers,
      },
    });
  }

  async listResponsesBySurvey(surveyId: string) {
    return this.prisma.response.findMany({
      where: { surveyId },
      include: { User: true, Survey: true },
    });
  }

  async listResponsesByUser(userId: string) {
    return this.prisma.response.findMany({
      where: { userId },
      include: { Survey: true },
    });
    
  }

  async createResponse(createResponseDto: any) {
    const { surveyId, userInfo, answers } = createResponseDto;

    // Crear la respuesta en la base de datos
    return await this.prisma.response.create({
      data: {
        surveyId,
        user: {
          create: {
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
          },
        },
        answers, // Directamente como JSON válido
      },
    });
  }
  
}
