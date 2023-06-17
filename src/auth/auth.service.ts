import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { Injectable } from '@nestjs/common';
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
      return;
    }

    const isPasswordCorrect = compareSync(password, collaborator.password);

    if (!isPasswordCorrect) {
      return;
    }

    return collaborator;
  }

  async login(user: Collaborator) {
    const payload: Payload = {
      user_email: user.email,
      user_id: user.id,
      user_name: user.name,
      user_surname: user.surname,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
