import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
      private toastController: ToastController
  ) { }

  async connectionFailed() {
    const toast = await this.toastController.create({
      message: 'Connection failed. Try again',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
