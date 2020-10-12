import { Injectable } from '@angular/core'
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Configuration } from './app.constant';

@Injectable()
export class AppState {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor(public http: Http, public _config: Configuration) {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {

    let current = this._data[event];
    if (current != value) {
      this._data[event] = value;

      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  subscribe(event: string, callback: Function) {
    var subscribers = this._subscriptions.get(event) || [];
    // console.log("subscribers" , subscribers);
    subscribers.push(callback);


    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    var subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }

  getRole() {
    let url = this._config.Server + "roles/manager";
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
}
