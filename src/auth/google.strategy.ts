import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
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
