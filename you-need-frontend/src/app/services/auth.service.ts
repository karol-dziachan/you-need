import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string | undefined>(undefined);
  public currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Decode token and set user
      this.currentUserSubject.next(localStorage.getItem('user') ?? undefined);
    }
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', credentials.email);
          this.currentUserSubject.next(credentials.email);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(undefined);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): string | undefined {
    return localStorage.getItem('user') ?? undefined;
  }
}
