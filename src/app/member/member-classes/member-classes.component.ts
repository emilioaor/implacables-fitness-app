import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-classes',
  templateUrl: './member-classes.component.html',
  styleUrls: ['./member-classes.component.scss'],
})
export class MemberClassesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
