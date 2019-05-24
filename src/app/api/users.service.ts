import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private USER_LIST_URL: string = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb';
  
  private USER_DETAIL_URL: string = 'https://randomuser.me/api/';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(`${this.USER_LIST_URL}`);
  }

  getUserDetail(): Observable<any> {
    return this.httpClient.get(`${this.USER_DETAIL_URL}`);
  }
}
