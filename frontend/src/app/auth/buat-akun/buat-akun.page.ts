import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { ImageUploaderPage } from 'src/app/image-uploader/image-uploader.page';
import { ApiService } from 'src/app/services/api.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-buat-akun',
  templateUrl: './buat-akun.page.html',
  styleUrls: ['./buat-akun.page.scss'],
})
export class BuatAkunPage implements OnInit {

  userData:any = {};
  constructor(
    public api: ApiService,
    public router:Router,
    public actionSheetController:ActionSheetController,
    public modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  async pilihFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Pilih',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Ambil Foto',
        icon: 'camera-outline',
        handler: () => {
          this.AmbilFoto('photo');
        }
      },
      {
        text: 'Ambil dari Galeri',
        icon: 'image',
        handler: () => {
          this.AmbilFoto('gallery');
        }
      }
    ]
    });
    await actionSheet.present();
  }

  async AmbilFoto(from:any) {
    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: (from == 'photo' ? CameraSource.Camera:CameraSource.Photos)
    });
    this.loadingAlert();
    this.showImageUploader(image.dataUrl, from);
  }

  blobImage:any;
  uploadImg!:boolean;
  //tampilkan image editor dan uploader
  async showImageUploader(imageData:any,from:any) {
    const modal = await this.modalController.create({
      component: ImageUploaderPage,
      componentProps: {
        imageData:imageData
      }
    });    
    modal.onDidDismiss().then(async (result) => {
      if(result)
      {
        this.userData.image = result.data;
        
        this.uploadImg = true;
      } else {
        this.loadingController.dismiss();
      } 
    });
    return await modal.present();
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
  
  type = 'password';
  show() {
    this.type == 'password' ? this.type = 'text': this.type = 'password';
  }

  loading!:boolean;
  buatAkun() {
    this.loading = true;
    this.userData.id = new Date().getTime().toString() + '' + [Math.floor((Math.random() * 1000))];
    this.api.post('auth/register', this.userData).subscribe(res => {
      if(res) {
        swal({
          title: "Berhasil",
          text: "Registrasi berhasil.",
          icon: "success",
          timer: 3000,
        });
        this.login();
      }
    }, err => {
      this.loading = false;
      swal({
        title: "Error",
        text: JSON.stringify(err.error.message),
        icon: "error",
        timer: 3000,
      });
    });
  }

  login() {
    this.api.post('auth/login', {email: this.userData.email, password: this.userData.password}).subscribe(res => {
      this.cek(res);
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  
  cek(res:any) {
    localStorage.setItem('fipexToken',JSON.stringify(res.token));
    this.router.navigate(['/tabs/tab2/0']);
  }

}
