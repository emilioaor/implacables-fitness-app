import { Injectable } from '@angular/core';
import {
  LocalNotificationsPlugin,
  Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationsPlugin,
  PushNotificationToken
} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  pushNotifications: PushNotificationsPlugin;
  localNotification: LocalNotificationsPlugin;

  constructor() {
    const {PushNotifications} = Plugins;
    const {LocalNotifications} = Plugins;

    this.pushNotifications = PushNotifications;
    this.localNotification = LocalNotifications;
  }

  handleNotifications() {

    if (location.host === 'localhost:8100') {
      return false;
    }

    this.pushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        this.pushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    this.pushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          console.log('Registration success Firebase', token);
        }
    );

    // Some issue with our setup and push will not work
    this.pushNotifications.addListener('registrationError',
        (error: any) => {
          console.log(error);
        }
    );

    // Show us the notification payload if the app is open on our device
    this.pushNotifications.addListener('pushNotificationReceived',
        async (notification: PushNotification) => {
          const not = await this.localNotification.schedule({
            notifications: [
              {
                title: notification.title,
                body: notification.body,
                id: 1,
                sound: null,
                attachments: null,
                actionTypeId: '',
                extra: null
              }
            ]
          });
        }
    );

    // Method called when tapping on a notification
    this.pushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        }
    );
  }
}
