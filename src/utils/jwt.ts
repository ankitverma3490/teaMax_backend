import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/env';
import { AuthUserPayload } from '../types';

export const signJwt = (payload: AuthUserPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as any,
  };
  return jwt.sign(payload, config.jwtSecret, options);
};

export const verifyJwt = (token: string): AuthUserPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as AuthUserPayload;
  } catch (error) {
    return null;
  }
};
