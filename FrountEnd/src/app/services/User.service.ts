import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../Model/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUserById(_id: String){

        return this.http.get(appConfig.apiUrl+'/user/'+_id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/user/register', user);
    }
}