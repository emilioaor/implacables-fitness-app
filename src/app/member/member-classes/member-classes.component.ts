import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {MemberService} from '../../services/member.service';
import {User} from '../../interfaces/user.interface';
import {ToastService} from '../../services/toast.service';

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
      private memberService: MemberService,
      private toastService: ToastService
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
        this.buildData(res.data);
      } else {
        this.classesGroup = [];
        this.toastService.connectionFailed();
      }
      this.loading = false;
    }, err => {
      console.log(err);
      this.classesGroup = [];
      this.loading = false;
      this.toastService.connectionFailed();
    });
  }

  buildData(data) {
    this.serverInfo.date = data.date;
    this.serverInfo.time = data.time;
    this.serverInfo.oneHourBefore = data.oneHourBefore;
    this.serverInfo.subscribed_dates = data.subscribed_dates;
    const classGroup = this.buildClasses(data.classes);

    if (this.isSameClassGroup(classGroup)) {
      this.updateClassGroup(classGroup);
    } else {
      this.classesGroup = classGroup;
    }
  }

  buildClasses(classes) {
    let last = '';
    let temp = [];
    const classesGroup = [];

    classes.forEach(c => {
      if (c.date_f !== last) {
        if (last !== '') {
          classesGroup.push({
            date: last,
            classes: temp
          });
        }

        last = c.date_f;
        temp = [];
      }

      temp.push(c);
    });

    classesGroup.push({
      date: last,
      classes: temp
    });

    return classesGroup;
  }

  isSameClassGroup(newGroup) {
    let isSame = true;

    newGroup.forEach((cg, icg) => {
      cg.classes.forEach((c, ic) => {

        if (
            typeof this.classesGroup[icg] === 'undefined' ||
            typeof this.classesGroup[icg].classes[ic] === 'undefined' ||
            this.classesGroup[icg].classes[ic].id !== c.id
        ) {
          isSame = false;
        }
      });
    });

    return isSame;
  }

  updateClassGroup(newGroup) {
    this.classesGroup.forEach((cg, icg) => {
      cg.classes.forEach((c, ic) => {
        c.subscribed = newGroup[icg].classes[ic].subscribed;
        c.count_subscribers = newGroup[icg].classes[ic].count_subscribers;
      });
    });
  }

  doRefresh(event) {
    this.memberService.classToday(this.user).subscribe((res: any) => {
      if (res.success) {
        this.buildData(res.data);
      } else {
        this.classesGroup = [];
        this.toastService.connectionFailed();
      }
      event.target.complete();
    }, err => {
      this.classesGroup = [];
      this.toastService.connectionFailed();
      event.target.complete();
    });
  }

  subscribe(classSelected) {
    this.loading = true;

    if (classSelected.subscribed === '0') {
      // Subscribe

      this.memberService.subscribeClass(classSelected.id, classSelected.date, this.user).subscribe((res: any) => {
        if (! res.success) {
          this.toastService.connectionFailed();
        }
        this.getClassToday();
      });

    } else {
      // Unsubscribe
      this.memberService.unsubscribeByDate(classSelected.date, this.user).subscribe((res: any) => {
        if (! res.success) {
          this.toastService.connectionFailed();
        }
        this.getClassToday();
      });
    }
  }
}
