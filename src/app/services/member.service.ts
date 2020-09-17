import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private apiService: ApiService) { }

  timeToNextClass() {
    return this.apiService.get('time_to_next_class');
  }
}
