import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  login(useremail: string, userpassword: string) {
    return this.apiService.post('login_user', {useremail, userpassword});
  }

  refreshLogin(userId) {
    return this.apiService.post('refresh_login', {user_id: userId});
  }

  updateFirebaseToken(userId, firebaseToken) {
    return this.apiService.post('update_firebase_token', {user_id: userId, firebase_token: firebaseToken});
  }
}
