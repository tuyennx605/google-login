import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
const OAuth2Data = require('../../../client_secret.json')

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: OAuth2Data.web.client_id,
      clientSecret: OAuth2Data.web.client_secret,
      callbackURL: OAuth2Data.web.redirect_uris[0],
      access_type: 'offline',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    }
    done(null, user);
  }
}