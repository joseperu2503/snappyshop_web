import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface JwtResponse extends JwtPayload {
  name: string;
  id: number;
  email: string;
}

interface ValidToken {
  isValid: true;
  decodedToken: JwtResponse;
}

interface InvalidToken {
  isValid: false;
  decodedToken: null;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token');
    return token;
  }

  removeToken() {
    removeCookie('token');
  }

  validateToken(): ValidToken | InvalidToken {
    const decodedToken = this.decodeToken();
    if (!decodedToken) {
      return {
        isValid: false,
        decodedToken: null,
      };
    }

    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      const today = new Date();

      if (tokenDate.getTime() > today.getTime()) {
        return {
          isValid: true,
          decodedToken: decodedToken,
        };
      }
    }
    return {
      isValid: false,
      decodedToken: null,
    };
  }

  decodeToken() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode<JwtResponse>(token);
    return decodedToken;
  }
}
