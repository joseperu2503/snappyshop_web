import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { JW_TOKEN } from '../../services/api/api.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(JW_TOKEN) === true) {
    req = addToken(req);
  }
  return next(req);
};

const addToken = (request: HttpRequest<unknown>) => {
  const tokenService = inject(TokenService);

  const token = tokenService.getToken();

  const authRequest = request.clone({
    headers: request.headers.set('Authorization', ` Bearer ${token}`),
  });
  return authRequest;
};
