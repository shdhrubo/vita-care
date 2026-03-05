import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // ── Outgoing request ──────────────────────────────────────────────────
    const cloned = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    });


    const startTime = Date.now();

    // ── Incoming response ─────────────────────────────────────────────────
    return next.handle(cloned).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - startTime;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const elapsed = Date.now() - startTime;
        return throwError(() => error);
      })
    );
  }
}
