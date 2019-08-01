import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
    try {
      const jwt: string = 'placeholderJWT';
      const user = {
        jwt,
      };
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
