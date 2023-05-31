import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ApiService } from 'src/app/services/api.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageUploaderPage } from 'src/app/image-uploader/image-uploader.page';

@Component({
  selector: 'app-perbarui-profil',
  templateUrl: './perbarui-profil.page.html',
  styleUrls: ['./perbarui-profil.page.scss'],
})
export class PerbaruiProfilPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private toastController: ToastController,
    public actionSheetController:ActionSheetController,
    private loadingController: LoadingController,
    private api: ApiService
  ) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    spaceBetween: 20,
    autoplay: true
  };
  
  ngOnInit() {
    this.getUserLogin();
    
  }

  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  userData:any = {};
  isLoggedIn!:boolean;
  getUserLogin() {
    this.api.me().subscribe(res => {
      this.userData = res;
      this.isLoggedIn = true;
      this.getDetailUser();
    }, err => {
      this.isLoggedIn = false;
    })
  }

  getDetailUser() {
    this.api.get('users/'+this.userData.id).subscribe(res=>{
      this.userData = res;
    }, error => {
      this.isLoggedIn = false;
    })
  }

  async loadingAlert() {
    return await this.loadingController.create({
      spinner: 'crescent',
      message: 'Mohon Tunggu...',
      cssClass: 'custom-class custom-loading'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        var that = this;
        setTimeout(function () {
          that.loadingController.dismiss();
        }, 3000);
      });
    });
  }

  loading!:boolean;
  updateData() {
    swal({
      title: "Konfirmasi",
      text: "Anda yakin ingin perbarui data profil?",
      buttons: ['Batal', 'Ya'],
      dangerMode: false,
    })
    .then((oke) => {
      if (oke) {
        let dt = {
          name: this.userData.name,
          bio: this.userData.bio,
        }
        this.api.put('users/'+this.userData.id, dt).subscribe(res => {
          swal({
            title: "Berhasil",
            text: "Berhasil memperbarui profil.",
            icon: "success",
            timer: 3000,
          });
          this.dismiss();
        }, err => {
          swal({
            title: "Error",
            text: err.error.message,
            icon: "error",
            timer: 3000,
          });
        })
      } else {
        console.log('Confirm Batal: blah');
      }
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
