import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAuthToken: any;

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> { 
    return this.http.post(`http://localhost:9092/auth/users/register`, user)
    .pipe(catchError(this.handleError));
  }

  login(user: any): Observable<any> { 
    return this.http.post(`http://localhost:9092/auth/users/login`, user);
  }

  getLoggedInUser(authToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get(`http://localhost:9092/auth/users/user`, { headers: headers });
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:9092/auth/users/list`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`http://localhost:9092/auth/users/DarthRevan253`);
  }

  updateWins(wins: any, authToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.put(`http://localhost:9092/auth/users/wins`, wins, { headers: headers });
  }

  updateLosses(losses: any, authToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.put(`http://localhost:9092/auth/users/losses`, losses, { headers: headers });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      return throwError("Error message is: " + error.message);
    } else {
      return throwError(error.error.message);
    }
  }
}
