import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {MemberPageComponent} from './member/member-page/member-page.component';
import {MemberDashboardComponent} from './member/member-dashboard/member-dashboard.component';
import {MemberClassesComponent} from './member/member-classes/member-classes.component';


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      MemberPageComponent,
      MemberDashboardComponent,
      MemberClassesComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
