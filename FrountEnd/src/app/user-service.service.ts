import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';





@Injectable()
export class UserServiceService {

  constructor(private http: Http) { }
  private API_URL = 'http://localhost:3000/api/v1/user';
  authToken;
  user;

  register(user): Observable<any> {
    return this.http
      .post(this.API_URL + '/signup' , user)
      .map(succss => succss.status)
      .catch(this.handleError);
  }

  login(user) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    console.log(user); 
    //debugger
    return this.http
      .post(this.API_URL + '/signin', user,{headers:headers})
      .map(this.extractData)      
      .catch(this.handleError);
  }





  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    console.log( this.authToken+'====================='+this.user);
  }

}
