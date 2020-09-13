import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss'],
})
export class MemberPageComponent implements OnInit {
  public selectedIndex = -1;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/folder/Inbox',
      icon: 'fitness'
    },
    {
      title: 'Classes',
      url: '/folder/Outbox',
      icon: 'list'
    },
    {
      title: 'Profile',
      url: '/folder/Favorites',
      icon: 'lock-closed'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  logout() {
    this.router.navigate(['/login']);
  }

}
