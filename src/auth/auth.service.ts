import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

export enum Provider {
    GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY;

  constructor(config: ConfigService) {
    this.JWT_SECRET_KEY = config.jwtSecretKey;
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      const payload = {
        thirdPartyId,
        provider,
      };

      return sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
    } catch (error) {
      throw new InternalServerErrorException('validateOAuthLogin', error.message);
    }
  }
}
