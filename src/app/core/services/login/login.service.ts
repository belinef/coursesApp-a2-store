import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
  private url: string = '/api/login';  // URL to web API

  constructor (private http: Http) {}

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  checkUser(course: Object) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/`, JSON.stringify(course), { headers })
      .map((res) => {
        const { logged, error , avatar} = res.json();

        return {logged, error, avatar};
      })
      .catch(this.handleError);
  }

  logOutUser() {
    return this.http.get(`${this.url}/`)
      .map((res) => ({}))
      .catch(this.handleError);
  }
}
