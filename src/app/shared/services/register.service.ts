import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import * as moment from "moment/moment";
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export class Registration {
  user: string;
  registrationDate: moment.Moment;
}

@Injectable()
export class RegisterService {
  private baseURL = environment.API;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem('jwt')
    })
  };

  constructor(private http: HttpClient) {}

  getRegistration(): Observable<Registration> {
    return this.http.get<Registration>(this.baseURL+'/auth/register', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}