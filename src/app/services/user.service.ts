import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getLoggedInUser(authToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })
    return this.http.get(`http://localhost:9092/auth/users/user`, { headers: headers })
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:9092/auth/users/list`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`http://localhost:9092/auth/users/DarthRevan253`);
  }
}
