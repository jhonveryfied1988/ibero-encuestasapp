import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una nueva encuesta con preguntas y opciones
  async createSurvey(userId: string, title: string, questions: any[]) {
    // Verifica si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Crea la encuesta asociada al usuario
    return this.prisma.survey.create({
      data: {
        title,
        user: { connect: { id: userId } },
        questions: {
          create: questions.map((question) => ({
            text: question.text,
            type: question.type,
            options: question.options
              ? {
                  create: question.options.map((optionText: string) => ({
                    text: optionText,
                  })),
                }
              : undefined,
          })),
        },
      },
      include: { questions: { include: { options: true } } },
    });
  }

  // Listar todas las encuestas activas con sus preguntas y opciones
  async listSurveys() {
    return this.prisma.survey.findMany({
      where: { isActive: true },
      include: { questions: { include: { options: true } } },
    });
  }

  // Obtener una encuesta específica por su ID
  async getSurveyById(id: string) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });

    if (!survey) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    return survey;
  }

  // Actualizar una encuesta con preguntas y opciones
  async updateSurvey(id: string, title: string, questions: any[]) {
    return this.prisma.survey.update({
      where: { id },
      data: {
        title,
        questions: {
          deleteMany: {}, // Elimina todas las preguntas existentes
          create: questions.map((question) => ({
            text: question.text,
            type: question.type,
            options: question.options
              ? {
                  create: question.options.map((optionText: string) => ({
                    text: optionText,
                  })),
                }
              : undefined,
          })),
        },
      },
      include: { questions: { include: { options: true } } },
    });
  }

  // Inactivar una encuesta
  async deactivateSurvey(id: string) {
    return this.prisma.survey.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Eliminar una encuesta permanentemente
  async deleteSurvey(id: string) {
    return this.prisma.survey.delete({
      where: { id },
    });
  }
}
