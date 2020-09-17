import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';
import {StorageService} from '../../services/storage.service';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss'],
})
export class MemberDashboardComponent implements OnInit, OnDestroy {

  user: User;
  h = 0;
  i = 0;
  s = 0;
  run = true;
  interval = () => {
    if (this.s > 0) {
      this.s--;
    } else {

      if (this.i > 0) {
        this.s = 59;
        this.i--;
      } else {

        if (this.h > 0) {
          this.i = 59;
          this.h--;
        }
      }
    }

    if (this.run) {
      window.setTimeout(this.interval, 1000);
    }
  }

  constructor(
      private storageService: StorageService,
      private memberService: MemberService
  ) { }

  ngOnInit() {
    this.storageService.getUser().then(user => {
      this.user = user;
    });

    this.memberService.timeToNextClass().subscribe((res: any) => {
      if (res.success) {
        this.h = res.data.h;
        this.i = res.data.i;
        this.s = res.data.s;
        this.handleCount();
      }
    });
  }

  ngOnDestroy() {
    this.run = false;
  }

  handleCount() {
    window.setTimeout(this.interval, 1000);
  }
}
