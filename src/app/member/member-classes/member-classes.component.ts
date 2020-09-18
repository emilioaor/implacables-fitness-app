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
  serverInfo = {
    date: '',
    time: '',
    oneHourBefore: '',
    subscribed_dates: []
  };
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
    this.classesGroup = [];

    this.memberService.classToday(this.user).subscribe((res: any) => {
      if (res.success) {
        this.buildData(res.data);
      }
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  buildData(data) {
    this.serverInfo.date = data.date;
    this.serverInfo.time = data.time;
    this.serverInfo.oneHourBefore = data.oneHourBefore;
    this.serverInfo.subscribed_dates = data.subscribed_dates;
    this.buildClasses(data.classes);
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
        this.buildData(res.data);
      }
      event.target.complete();
    }, err => {
      console.log(err);
      event.target.complete();
    });
  }

  subscribe(classSelected) {
    this.loading = true;

    if (classSelected.subscribed === '0') {
      // Subscribe

      this.memberService.subscribeClass(classSelected.id, classSelected.date, this.user).subscribe((res: any) => {
        if (! res.success) {
        }
        this.getClassToday();
      });

    } else {
      // Unsubscribe
      this.memberService.unsubscribeByDate(classSelected.date, this.user).subscribe((res: any) => {
        if (! res.success) {
        }
        this.getClassToday();
      });
    }
  }
}
