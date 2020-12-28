import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    ) {
    super({
      jwtFromRequest:  process.env.TEST === 'true' ? () => {} : ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: process.env.TEST === 'true' ? 'something' : process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}