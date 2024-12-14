import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear una nueva encuesta con preguntas y opciones.
   * @param userId ID del usuario asociado
   * @param title Título de la encuesta
   * @param questions Preguntas de la encuesta
   */
  async createSurvey(userId: string, title: string, questions: any[]) {
    // Verifica si el usuario existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Crea la encuesta y sus preguntas
    return await this.prisma.survey.create({
      data: {
        title,
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

  /**
   * Listar todas las encuestas activas con sus preguntas y opciones.
   */
  async listSurveys() {
    return await this.prisma.survey.findMany({
      include: { questions: { include: { options: true } } },
    });
  }

  /**
   * Obtener una encuesta específica por su ID.
   * @param id ID de la encuesta
   */
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

  /**
   * Actualizar una encuesta con preguntas y opciones.
   * @param id ID de la encuesta
   * @param title Nuevo título de la encuesta
   * @param questions Nuevas preguntas para la encuesta
   */
  async updateSurvey(id: string, title: string, questions: any[]) {
    // Actualizar el título y las preguntas de la encuesta
    return await this.prisma.survey.update({
      where: { id },
      data: {
        title,
        questions: {
          deleteMany: {}, // Limpia las preguntas existentes
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

  /**
   * Inactivar una encuesta.
   * @param id ID de la encuesta
   */
  async deactivateSurvey(id: string) {
    const surveyExists = await this.prisma.survey.findUnique({
      where: { id },
    });

    if (!surveyExists) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    return await this.prisma.survey.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * Eliminar una encuesta permanentemente.
   * @param id ID de la encuesta
   */
  async deleteSurvey(id: string) {
    const surveyExists = await this.prisma.survey.findUnique({
      where: { id },
    });

    if (!surveyExists) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    return await this.prisma.survey.delete({
      where: { id },
    });
  }
}
