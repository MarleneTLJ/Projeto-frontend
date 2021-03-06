import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, firstValueFrom, of } from 'rxjs';
import { tap, pluck, catchError } from 'rxjs/operators';

import { User } from '../../interfaces/';

import { TokenStorage } from './token.storage';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

  // Função do usuário fazer login
  login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>('http://localhost:3000/api/auth/login', {
        email,
        password,
      })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  // Função do usuário se cadastrar
  register(
    name: string,
    surname: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Observable<User> {
    return this.http
      .post<AuthResponse>('http://localhost:3000/api/auth/register', {
        name,
        surname,
        email,
        password,
        repeatPassword,
      })
      .pipe(pluck('user'));
  }

  setUser(user: User | null): void {
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` };
  }

  me(): Observable<User | null> {
    return this.http
      .get<AuthResponse>('http://localhost:3000/api/auth/me')
      .pipe(
        tap(({ user }) => this.setUser(user)),
        pluck('user'),
        catchError(() => of(null))
      );
  }

  checkTheUserOnTheFirstLoad(): Promise<User | null> {
    return firstValueFrom(this.me());
  }
}
