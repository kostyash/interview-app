import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './entities/contracts';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly baseUrl = 'http://localhost:7777/api/';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }
}
