import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';


@Injectable()
export class CoursesService {
  private url: string = '/api/courses';  // URL to web API

  constructor (private http: Http) {}

  private extractData(res: Response) {
    const body = res.json();

    let { coursesList , course} = body;

    if(course) {
      return course;
    }

    coursesList = coursesList.map(course => {
      course.date = new Date(course.date);

      return course;
    });

    return coursesList;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg); // log to console instead
    return Observable.empty();
  }

  getCourseById(id) {
    return this.http.get(`${this.url}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCourses(listType) {
    return this.http.get(`${this.url}/${listType}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchCourses(query, listType) {
    let params = new URLSearchParams();

    params.set('search', query);

    return this.http.get(`${this.url}/${listType}`, { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateCourse(id, data: Object) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.url}/${id}`, JSON.stringify(data), { headers })
      .map((res) => {
        const { updated, id } = res.json();

        return {updated, id};
      })
      .catch(this.handleError);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.url}/${id}`)
      .map((res) => {
        const body = res.json();

        return body;
      })
      .catch(this.handleError);
  }

  createCourse(course: Object) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/`, JSON.stringify(course), { headers })
      .map((res) => {
        const { created, id } = res.json();

        return {created, id};
      })
      .catch(this.handleError);
  }

  subscribeCourse(id, option) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(`/api/subscription/`, JSON.stringify({id, subscribed: option}), { headers })
      .map((res) => {
        const { subscribed, id } = res.json();

        return {subscribed, id};
      })
      .catch(this.handleError);
  }

  approveCourse(id) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(`/api/approve/`, JSON.stringify({id}), { headers })
      .map((res) => {
        const { id } = res.json();

        return { id };
      })
      .catch(this.handleError);
  }

  rejectCourse(id, reason) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(`/api/reject/`, JSON.stringify({id, reason}), { headers })
      .map((res) => {
        const { id } = res.json();

        return { id};
      })
      .catch(this.handleError);
  }

  getCount(type) {
    let params = new URLSearchParams();

    params.set('type', type);

    return this.http.get('/api/count', { search: params })
      .map(
      (res) => {
        const {count} = res.json();

        return count;
      }
    )
      .catch(this.handleError);
  }
}
