import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { SweetAlert } from 'sweetalert/typings/core';
import { CheckinPesertaPage } from '../checkin-peserta/checkin-peserta.page';
const swal: SweetAlert = require('sweetalert');
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  userData:any = {};
  isLoggedIn!:boolean;
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  constructor(
    public api: ApiService,
    public router:Router,
    public actionSheetController:ActionSheetController,
    public modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }
  
  loading!:boolean;
  ngOnInit(): void {
    this.loading = true;
    this.cekLogin();
  }

  async doRefresh(event:any) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  cekLogin()
  {    
    this.api.me().subscribe(res=>{
      this.userData = res;
      this.isLoggedIn = true;
      this.getDetailUser();
    }, error => {
      this.loading = false;
      this.isLoggedIn = false;
    })
  }

  getDetailUser() {
    this.api.get('users/'+this.userData.id).subscribe(res=>{
      this.userData = res;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.isLoggedIn = false;
    })
  }

  async scanPeserta() {
    const modal = await this.modalController.create({
      component: CheckinPesertaPage,
      mode: "md",
      cssClass: 'modal-class',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 1]
    });
    
    modal.onDidDismiss().then(async res => {
      if(!res.data.dismissed) {
        if(res.data.email.includes('http')) {
          swal({
            title: "Error",
            text: "Format data QrCode salah!",
            icon: "error",
            timer: 3000,
          });
        } else {
          this.getIsPeserta(res.data.email);
        }
      }
    });

    return await modal.present();
  }

  getIsPeserta(data:any) {
    this.api.get('fitalks/check/partisipant/'+data).subscribe(res => {
      if(res) {
        this.loadingAlert();
        this.checkinFitalks(res);
      }
    }, err => {
      swal({
        title: "Error",
        text: JSON.stringify(err.error.message),
        icon: "error",
        timer: 3000,
      });
    })
  }

  checkinFitalks(data:any) {
    let dt = {
      alreadyPresent: 1
    }
    this.api.put('fitalks/'+data.id, dt).subscribe(res => {
      if(res) {
        this.toastController
        .create({
          message: 'Check-In Kehadiran Berhasil.',
          duration: 2000,
          color: "primary",
        })
        .then((toastEl) => {
          toastEl.present();
        });
        this.router.navigate(['/tabs/tab1'], {replaceUrl: true});
      }
    }, err => {
      swal({
        title: "Error",
        text: JSON.stringify(err.error.message),
        icon: "error",
        timer: 3000,
      });
    })
  }

  async loadingAlert() {
    return await this.loadingController.create({
      spinner: 'crescent',
      message: 'Mohon Tunggu...',
      cssClass: 'custom-class custom-loading'
    }).then(a => {
      a.present().then(() => {
        var that = this;
        setTimeout(function () {
          that.loadingController.dismiss();
        }, 800);
      });
    });
  }

}
