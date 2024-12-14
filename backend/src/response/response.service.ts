import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResponseService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================
  // Métodos para el módulo User
  // ============================

  /**
   * Crear una nueva respuesta rápida.
   * @param userId ID del usuario
   * @param surveyId ID de la encuesta
   * @param answers Respuestas proporcionadas por el usuario
   */
  async submitResponse(userId: string, surveyId: string, answers: any) {
    return await this.prisma.response.create({
      data: {
        userId,
        surveyId,
        answers, // Guardar las respuestas como JSON
      },
    });
  }

  /**
   * Crear una respuesta detallada.
   * @param createResponseDto Objeto con datos del usuario, encuesta y respuestas
   */
  async createResponse(createResponseDto: any) {
    const { userInfo, surveyId, answers } = createResponseDto;

    // Hashear un password predeterminado si no se proporciona
    const hashedPassword = userInfo.password
      ? await bcrypt.hash(userInfo.password, 10)
      : await bcrypt.hash('defaultPassword123', 10);

    // Crear o actualizar el usuario
    const user = await this.prisma.user.upsert({
      where: { email: userInfo.email },
      update: {
        name: userInfo.name,
        phone: userInfo.phone,
      },
      create: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        password: hashedPassword, // Aseguramos que siempre tenga un password
      },
    });

    // Crear la respuesta vinculada al usuario y encuesta
    return await this.prisma.response.create({
      data: {
        userId: user.id,
        surveyId,
        answers,
      },
    });
  }

  /**
   * Obtener todas las respuestas enviadas por un usuario específico.
   * @param userId ID del usuario
   */
  async listResponsesByUser(userId: string) {
    return await this.prisma.response.findMany({
      where: { userId },
      include: {
        survey: true, // Incluye detalles de la encuesta
      },
    });
  }

  // ============================
  // Métodos para el módulo Admin
  // ============================

  /**
   * Obtener todas las respuestas con detalles de usuario y encuesta.
   */
  async getAllResponses() {
    return await this.prisma.response.findMany({
      include: {
        user: true,
        survey: true,
      },
    });
  }

  /**
   * Obtener todas las respuestas asociadas a una encuesta específica.
   * @param surveyId ID de la encuesta
   */
  async listResponsesBySurvey(surveyId: string) {
    return await this.prisma.response.findMany({
      where: { surveyId },
      include: {
        user: true, // Incluye detalles del usuario
      },
    });
  }

  /**
   * Eliminar una respuesta por su ID.
   * @param responseId ID de la respuesta
   */
  async deleteResponse(responseId: string) {
    return await this.prisma.response.delete({
      where: { id: responseId },
    });
  }
}
