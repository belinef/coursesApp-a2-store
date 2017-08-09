import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class ProfileService {
  private url: string = '/api/profile';  // URL to web API

  constructor (private http: Http) {}

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getProfile() {
    return this.http.get(`${this.url}/`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  updateProfile(prop, value) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.url}/`, JSON.stringify({
      prop,
      value
    }), { headers })
      .map(() => ({}))
      .catch(this.handleError);
  }
}
