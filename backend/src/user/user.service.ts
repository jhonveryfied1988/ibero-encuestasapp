import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo usuario
  async createUser(name: string, email: string, phone: string, password: string) {
    // Verifica si el correo o el teléfono ya están en uso
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException('El correo electrónico ya está registrado.');
      }
      if (existingUser.phone === phone) {
        throw new ConflictException('El número de teléfono ya está registrado.');
      }
    }

    // Encripta la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario
    return this.prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });
  }

  // Obtener usuario por ID
  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // Obtener usuario por correo electrónico
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
