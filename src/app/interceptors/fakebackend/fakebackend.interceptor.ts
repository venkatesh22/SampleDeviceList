import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

const users = [{
  id: 1,
  username: 'demo1',
  password: 'demo1',
  firstName: 'Demo',
  lastName: '1'
}];


@Injectable()
export class FakebackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    return of(null).pipe(mergeMap(handleRoute)) as any;
    // return next.handle(request);

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return success({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'FAKE-AUTH_TOKEN'
      });
    }

    function success(resp?: any) {
      return of(new HttpResponse({ status: 200, body: resp }));
    }

    function error(resp?: any) {
      return of(new HttpResponse({ status: 400, body: resp }));
    }
  }
}
