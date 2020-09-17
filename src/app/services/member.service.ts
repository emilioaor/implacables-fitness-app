import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {User} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private apiService: ApiService) { }

  timeToNextClass() {
    return this.apiService.get('time_to_next_class');
  }

  classToday(user: User) {
    return this.apiService.post('class_today', {user});
  }
}
