import { Injectable } from '@angular/core';
import {Plugins, StoragePlugin} from '@capacitor/core';
import {User} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: StoragePlugin;

  constructor() {
    const { Storage } = Plugins;
    this.storage = Storage;
  }

  async setUser(user: User) {
    await this.storage.set({
      key: 'implacables-user',
      value: btoa(JSON.stringify(user))
    });
  }

  getUser(): Promise<User> {
    return new Promise(resolve => {
      let user = null;

      this.storage.get({key: 'implacables-user'}).then(token => {
        if (token.value) {
          user = JSON.parse(atob(token.value));
        }

        resolve(user);
      });
    });
  }

  async logout() {
    await this.storage.remove({key: 'implacables-user'});
  }
}
