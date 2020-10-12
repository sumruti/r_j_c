import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';
@Injectable()
export class UsersService {
  public users: any;
  public Url: string;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({
    headers: this.headers
  });
  constructor(public http: Http, public _config: Configuration) { }

  getusersList(offset, limit, searchEnabled, searchTerm, sortCondition): Observable<any> {
    let adminToken = localStorage.getItem('adminToken');
    let url = this._config.Server + "admin/users?limit=" + limit + "&offset=" + offset + "&search=" + searchEnabled + "&term=" + searchTerm + "&sort=" + sortCondition;
    return this.http.get(url, { headers: this._config.headers })
      .map(res => res.json())
      .map(res => {
        return res
      });
  }
  rejectUser(userReject): Observable<any> {
    let url = this._config.Server + "reject";
    let body = { reject: userReject };
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  sendPush(data) {
    let url = this._config.Server + "adminSendNotification";
    let body = JSON.stringify(data);
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  sendPushToAll(data) {
    let url = this._config.Server + "sendToAll";
    let body = JSON.stringify(data);
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }

  // adminPushNotification(title, msg, urlLink, imgUrl, users): Observable<any> {
  //   let url = this._config.Server + "adminSendNotification";
  //   let body = {
  //     title: title,
  //     message: msg,
  //     urlLink: urlLink,
  //     image: imgUrl,
  //     users: users
  //   }
  //   // console.log("body", body);
  //   return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  // }
  // sendToAllNotification(title, msg, urlLink, imgUrl): Observable<any> {
  //   let url = this._config.Server + "sendToAll";
  //   let body = {
  //     title: title,
  //     message: msg,
  //     urlLink: urlLink,
  //     image: imgUrl,
  //   };
  //   return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  // }

  addUsers(data): Observable<any> {
    // console.log("New user" + data.name);
    let Url = this._config.Server + "user";
    let body = JSON.stringify(data);
    //let headers = { headers : this.headers };
    return this.http.post(Url, body, { headers: this.headers }).map(res => res.json());
  }
  deluser(id): Observable<any> {
    // console.log("deleted user id", id);
    let Url = this._config.Server + "user?id=" + id;
    //let body = JSON.stringify({id: id}); 
    return this.http.delete(Url, { headers: this.headers }).map(res => res.json());
  }
  edituser(data): Observable<any> {
    //console.log("service id",id);
    // console.log("service data", data);
    let Url = this._config.Server + "user";
    let body = JSON.stringify(data);
    // console.log("body", body);
    return this.http.put(Url, body, { headers: this.headers }).map(res => res.json());
  }
  checkEmail(mailid): Observable<any> {
    // console.log("mail id", mailid);
    let Url = this._config.Server + "Checkemail?mailid=" + mailid;
    //let body = JSON.stringify({mailid});
    return this.http.get(Url, { headers: this.headers }).map(res => res.json());
  }
  uploadPushImage(image) {
    let url = this._config.Server + "pushImageUpload";
    let body = {
      image: image,
    }
    // console.log("body", body);
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  gotoDeleteUser(username) {
    let url = this._config.Server + "admin/user?username=" + username;
    // console.log("url", url);
    return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
  }




  // private jwt() {
  //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //     if (currentUser && currentUser.token) {
  //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
  //         return new RequestOptions({ headers: headers });
  //     }
  // }


}
