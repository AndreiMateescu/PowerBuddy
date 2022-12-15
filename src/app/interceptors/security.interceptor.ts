import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
      const req = request.clone({
        setHeaders:{
          // API Management
          'Ocp-Apim-Subscription-Key': 'ffb08ad514c544c9b228d6f4b827c000',
          // Azure functions
          'x-functions-key': 'YOUR_AZURE_FUNCTIONS_MASTER_KEY_FROM_AZURE',
          // If you are using localhost, no changes are needed here
        }
      });
    
    return next.handle(req);
  }
}
