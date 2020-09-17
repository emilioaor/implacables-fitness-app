import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {MemberService} from '../../services/member.service';
import {User} from '../../interfaces/user.interface';

@Component({
  selector: 'app-member-classes',
  templateUrl: './member-classes.component.html',
  styleUrls: ['./member-classes.component.scss'],
})
export class MemberClassesComponent implements OnInit {

  classesGroup = [];
  loading = true;
  user: User;

  constructor(
      private storageService: StorageService,
      private memberService: MemberService
  ) { }

  ngOnInit() {
    this.storageService.getUser().then(user => {
      this.user = user;
      this.getClassToday();
    });
  }

  getClassToday() {
    this.memberService.classToday(this.user).subscribe((res: any) => {
      if (res.success) {
        this.buildClasses(res.data.classes);
      }
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  buildClasses(classes) {
    let last = '';
    let temp = [];

    classes.forEach(c => {
      if (c.date_f !== last) {
        if (last !== '') {
          this.classesGroup.push({
            date: last,
            classes: temp
          });
        }

        last = c.date_f;
        temp = [];
      }

      temp.push(c);
    });

    this.classesGroup.push({
      date: last,
      classes: temp
    });
  }

  doRefresh(event) {
    this.classesGroup = [];
    this.memberService.classToday(this.user).subscribe((res: any) => {
      if (res.success) {
        this.buildClasses(res.data.classes);
      }
      event.target.complete();
    }, err => {
      console.log(err);
      event.target.complete();
    });
  }
}
