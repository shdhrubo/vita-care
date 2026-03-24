import { inject, Injectable } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly AUTH0_STORAGE_KEY = `@@auth0spajs@@::Fd18UHvl1kdPMWPtIHKDEclW3MhxkCwX::@@user@@`;
  private toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.getIdToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const cloned = req.clone({ setHeaders: headers });

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        this.toastr.error(errorMessage, 'Error');
        return throwError(() => error);
      }),
    );
  }

  private getIdToken(): string | null {
    const raw = localStorage.getItem(this.AUTH0_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return parsed?.id_token ?? null;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
