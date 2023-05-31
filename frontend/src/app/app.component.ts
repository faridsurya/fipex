import { Component, NgZone, ViewChild } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, IonRouterOutlet, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
import { Location } from "@angular/common";
import { ApiService } from './services/api.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet!: IonRouterOutlet;
  private lastBackTime: number = 0;
  private intervalExitApp: number = 2000;
  userData: any;

  constructor(
    private router: Router, 
    private platform: Platform,
    private api: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private zone: NgZone,
  ) {
    defineCustomElements(window);
    this.initializeApp();
    this.platform.backButton.subscribe(() => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/tabs/tab1' || this.router.url === '/tabs/tab2/0' || this.router.url === '/tabs/tab3') {
        this.router.navigate(['/tabs/tab1']);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonEvent();
      Keyboard.addListener('keyboardWillShow', info => {
        console.log('keyboard will show with height:', info.keyboardHeight);
      });
      
      Keyboard.addListener('keyboardDidShow', info => {
        console.log('keyboard did show with height:', info.keyboardHeight);
      });
      
      Keyboard.addListener('keyboardWillHide', () => {
        console.log('keyboard will hide');
      });
      
      Keyboard.addListener('keyboardDidHide', () => {
        console.log('keyboard did hide');
      });
    });
  }

  private backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      let currentTime = new Date().getTime();
      if (
        !this.routerOutlet.canGoBack() &&
        this.lastBackTime &&
        this.lastBackTime > 0 &&
        currentTime - this.lastBackTime < this.intervalExitApp
      ) {
        App.exitApp();
        return;
      }
      if (!this.routerOutlet.canGoBack()) {
        this.createToastExitApp();
      } else {
        this.routerOutlet.pop();
      }
    });
  }

  private createToastExitApp() {
    this.toastController
      .create({
        message: 'Tekan sekali lagi untuk keluar',
        duration: 2000,
        color: "primary",
      })
      .then((toastEl) => {
        toastEl.present();
        this.lastBackTime = new Date().getTime();
      });
  }
}
