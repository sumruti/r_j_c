import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class CommentsService {
  public Url: string;
  constructor(public http: Http, public _config: Configuration) { }

  getComments(postId, limit, offset): Observable<any> {
    let url = this._config.Server + "getPostComments";
    let body = { postId: postId, limit: limit, offset: offset };
    // console.log("body", body);
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  deleteComment(deleteId, commentId, commentedBy, type): Observable<any> {
    let url = this._config.Server + "admin-delete-comment";
    let body = { postId: deleteId, commentedBy: commentedBy, type: type, commentId: commentId };
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }

}