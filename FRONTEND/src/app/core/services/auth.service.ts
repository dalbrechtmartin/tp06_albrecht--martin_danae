import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.backendLoginClient}`, { login, password });
  }
}