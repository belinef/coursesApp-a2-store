import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthorsService {
  private url: string = '/api/authors';  // URL to web API

  constructor (private http: Http) {}

  private extractData(res: Response) {
    const { authors } = res.json();

    return authors;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  searchAuthors(query) {
    let params = new URLSearchParams();

    params.set('search', query);

    return this.http.get(`${this.url}/`, { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }

  createAuthor(author: Object) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/`, JSON.stringify({name : author}), { headers })
      .map((res) => {
        const { created, error , name} = res.json();

        return {created, error , name};
      })
      .catch(this.handleError);
  }
}
