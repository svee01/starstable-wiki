import { jwtDecode } from 'jwt-decode';

export interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export class TokenService {
  static getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.sub;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
}
