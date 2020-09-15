import { Injectable } from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  constructor(
      private platform: Platform,
      private router: Router,
      private alertController: AlertController
  ) { }

  static closeApp() {
    navigator['app'].exitApp();
  }

  subscribeBackButton() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  handleBackButton() {
    console.log('handleButton', this.router.url);
    switch (this.router.url) {
      case '/login':
        BackService.closeApp();
        break;
      default:
        this.logout();
        break;
    }
  }

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
