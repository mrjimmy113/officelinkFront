import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../service/authentication.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authSer: AuthenticationService, private route:Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authSer.isLogin()) {
      request = request.clone({
        setHeaders: {
          authorization: this.authSer.getToken().toString(),
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              if(event.body == 403) alert("You don`t have permission to do this")
              if(event.body == 401) {
                alert("Please login to do this operation");
                this.authSer.logout();

              }

          }
          return event;
      }));
  }
}
