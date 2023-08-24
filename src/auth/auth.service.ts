import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Collaborator } from '@app/entities/collaborator/collaborator';
import { Payload } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private collaboratorsRepository: CollaboratorsRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const collaborator = await this.collaboratorsRepository.findByEmail(
      username,
    );

    if (!collaborator) {
      throw new NotFoundException('E-mail e/ou senha incorretos', {
        cause: new Error(),
        description: 'E-mail e/ou senha incorretos',
      });
    }

    const isPasswordCorrect = compareSync(password, collaborator.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException('E-mail e/ou senha incorretos', {
        cause: new Error(),
        description: 'E-mail e/ou senha incorretos',
      });
    }

    return collaborator;
  }

  async login(user: Collaborator) {
    const payload: Payload = {
      user_email: user.email,
      user_id: user.id,
      user_name: user.name,
      user_surname: user.surname,
      is_admin: user.admin,
      user_company: user.company_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
