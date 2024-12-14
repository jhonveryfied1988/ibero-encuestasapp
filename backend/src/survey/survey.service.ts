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
    try {
      console.log('Iniciando la creación de la encuesta...');
      console.log('Datos recibidos:', { userId, title, questions });

      // Verifica si el usuario existe
      const userExists = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      console.log('Usuario encontrado:', userExists);

      if (!userExists) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Crea la encuesta
      const newSurvey = await this.prisma.survey.create({
        data: {
          title,
          userId,
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

      console.log('Encuesta creada exitosamente:', newSurvey);
      return newSurvey;
    } catch (error) {
      console.error('Error al crear la encuesta:', error);
      throw error;
    }
  }


  /**
   * Listar todas las encuestas activas con sus preguntas y opciones.
   */
  async listSurveys() {
    return this.prisma.survey.findMany({
      where: { isActive: true }, // Filtra solo encuestas activas
      include: {
        questions: {
          include: {
            options: true, // Incluye las opciones de cada pregunta
          },
        },
      },
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
    // Obtener las preguntas actuales relacionadas con la encuesta
    const existingQuestions = await this.prisma.question.findMany({
      where: { surveyId: id },
      include: { options: true }, // Incluye las opciones existentes para manejar sus relaciones
    });
  
    const questionsToUpdate = questions.filter((q) => q.id); // Preguntas con ID
    const questionsToCreate = questions.filter((q) => !q.id); // Preguntas nuevas
    const questionIdsToKeep = questionsToUpdate.map((q) => q.id);
    const questionsToDelete = existingQuestions.filter(
      (q) => !questionIdsToKeep.includes(q.id)
    );
  
    // Manejando las opciones para preguntas a actualizar
    const updateOperations = questionsToUpdate.map((q) => {
      const existingQuestion = existingQuestions.find((eq) => eq.id === q.id);
  
      const optionsToUpdate = q.options?.filter((opt: any) => opt.id); // Opciones con ID (existentes)
      const optionsToCreate = q.options?.filter((opt: any) => !opt.id); // Opciones nuevas
      const optionIdsToKeep = optionsToUpdate?.map((opt: any) => opt.id);
      const optionsToDelete = existingQuestion?.options.filter(
        (opt) => !optionIdsToKeep?.includes(opt.id)
      );
  
      return {
        where: { id: q.id },
        data: {
          text: q.text,
          type: q.type,
          options: {
            deleteMany: { id: { in: optionsToDelete?.map((opt) => opt.id) } }, // Eliminar opciones
            update: optionsToUpdate?.map((opt: { id: string; text: string }) => ({
              where: { id: opt.id },
              data: { text: opt.text },
            })), // Actualizar opciones existentes
            create: optionsToCreate?.map((opt: { id: string; text: string }) => ({
              text: opt.text,
            })), // Crear nuevas opciones
          },
        },
      };
    });
  
    // Actualizar la encuesta y manejar relaciones con preguntas y opciones
    return await this.prisma.survey.update({
      where: { id },
      data: {
        title,
        questions: {
          deleteMany: { id: { in: questionsToDelete.map((q) => q.id) } }, // Eliminar preguntas no necesarias
          update: updateOperations, // Actualizar preguntas existentes y sus opciones
          create: questionsToCreate.map((q) => ({
            text: q.text,
            type: q.type,
            options: {
              create: q.options?.map((opt: any) => ({
                text: opt.text,
              })),
            },
          })), // Crear nuevas preguntas
        },
      },
      include: { questions: { include: { options: true } } }, // Incluye preguntas y opciones actualizadas
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


  async getSurveyResults(id: string) {
    // Encuentra la encuesta con sus respuestas y preguntas
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: {
        user: true, // Incluye los datos del usuario
        questions: {
          include: {
            options: true,
          },
        },
        responses: {
          include: {
            answers: {
              include: {
                question: true,
              },
            },
            user: {
              select: { id: true, email: true },
            },
          },
        },
      },
    });
  
    if (!survey) {
      throw new NotFoundException('Encuesta no encontrada');
    }

      // Mapear los resultados con el texto de las preguntas
  return {
      title: survey.title,
      responses: survey.responses.map((response) => ({
        userId: response.userId,
        userEmail: response.user.email, // Añade el email del usuario
        answers: response.answers.map((answer) => ({
          questionText: answer.question.text, // Incluye el texto de la pregunta
          value: answer.value,
        })),
      })),
    };
  }
  

}
