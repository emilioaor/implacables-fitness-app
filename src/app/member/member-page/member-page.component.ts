import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

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
      url: '/member/dashboard',
      icon: 'fitness'
    },
    {
      title: 'Classes',
      url: '/member/classes',
      icon: 'list'
    }
  ];

  constructor(
      private router: Router,
      private alertController: AlertController
  ) { }

  ngOnInit() {}

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout!',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'YES',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
