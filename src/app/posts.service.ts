import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './entities/post';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  readonly baseUrl = 'http://localhost:7777/api/posts/';

  constructor(private http: HttpClient) { }

  public getPosts(username: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.baseUrl + username);
  }

  public setPostStatus(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.baseUrl + 'like/', post);
  }
}
