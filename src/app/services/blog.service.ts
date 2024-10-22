import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from '../models/blog.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) {}

  getAllBlogs(): Observable<Array<IBlog>> {
    return this._http.get<Array<IBlog>>(this.baseUrl);
  }

  getBlogById(blogId: string): Observable<IBlog> {
    const url = `${this.baseUrl}/${blogId}`;
    return this._http.get<IBlog>(url);
  }

  deleteBlog(blogId: string): Observable<any> {
    const url = `${this.baseUrl}/${blogId}`;
    return this._http.delete<string>(url);
  }

  updateBlog(blogId: string, updatedBlog: IBlog): Observable<any> {
    const url = `${this.baseUrl}/${blogId}`;
    return this._http.put<string>(url, updatedBlog);
  }

  createBlog(newBlog: IBlog): Observable<string> {
    return this._http.post<string>(this.baseUrl, newBlog);
  }
}
