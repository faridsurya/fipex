import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { ImageUploaderPage } from 'src/app/image-uploader/image-uploader.page';
import { SweetAlert } from 'sweetalert/typings/core';
import { PerbaruiProfilPage } from './perbarui-profil/perbarui-profil.page';
import { PerbaruiSandiPage } from './perbarui-sandi/perbarui-sandi.page';
import { PesertaFitalksPage } from '../peserta-fitalks/peserta-fitalks.page';
const swal: SweetAlert = require('sweetalert');
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  userData:any = {};
  isLoggedIn!:boolean;
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  constructor(
    public api: ApiService,
    public router:Router,
    public actionSheetController:ActionSheetController,
    public modalController: ModalController,
    private loadingController: LoadingController,
  ) { }
  
  loading!:boolean;
  ngOnInit(): void {
    this.loading = true;
    this.cekLogin();
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  async doRefresh(event:any) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
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
      this.getMyBadges();
    }, error => {
      this.loading = false;
      this.isLoggedIn = false;
    })
  }

  myBadges:any = {};
  getMyBadges() {
    this.api.get('user/badges').subscribe(res => {
      this.myBadges = res;
    })
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
    this.showImageUploader(image, image.dataUrl, from);
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

  blobImage:any;
  uploadImg!:boolean;
  //tampilkan image editor dan uploader
  async showImageUploader(image:any, imageData:any,from:any) {
    const modal = await this.modalController.create({
      component: ImageUploaderPage,
      componentProps: {
        imageData:imageData
      }
    });    
    modal.onDidDismiss().then(async (result) => {
      if(result)
      {
        let dt = {
          base64: result.data.replace('data:image/png;base64,', ''),
          extension: image.format
        }
        this.updateData(dt);
      } else {
        this.loadingController.dismiss();
      } 
    });
    return await modal.present();
  }
  
  updateData(dt:any) {
    swal({
      title: "Konfirmasi",
      text: "Anda yakin ingin perbarui foto profil?",
      buttons: ['Batal', 'Ya'],
      dangerMode: false,
    })
    .then((oke) => {
      if (oke) {
        this.loadingAlert();
        this.api.post('users/upload', dt).subscribe(res => {
          swal({
            title: "Berhasil",
            text: "Berhasil memperbarui foto.",
            icon: "success",
            timer: 3000,
          });
          this.ngOnInit();
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

  async perbaruiProfil() {
    const modal = await this.modalController.create({
      component: PerbaruiProfilPage,
      mode: "md",
      cssClass: 'modal-class',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 1]
    });

    modal.onDidDismiss().then(async res => {
      this.ngOnInit();
    });
    
    return await modal.present();
  }

  async perbaruiSandi() {
    const modal = await this.modalController.create({
      component: PerbaruiSandiPage,
      mode: "md",
      cssClass: 'modal-class',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 1]
    });

    modal.onDidDismiss().then(async res => {
      if(!res.data.dismissed) {
        this.logout();
      }
    });
    
    return await modal.present();
  }

  async pesertaFiTalks() {
    const modal = await this.modalController.create({
      component: PesertaFitalksPage,
      mode: "md",
      cssClass: 'modal-class',
      initialBreakpoint: 0.95,
      breakpoints: [0, 0.95, 1]
    });

    modal.onDidDismiss().then(async res => {
      if(!res.data.dismissed) {
        this.logout();
      }
    });
    
    return await modal.present();
  }

  showBadge:boolean = false;
  openCardBadge() {
    this.showBadge ? this.showBadge = false:this.showBadge = true;
  }
  
  logout() {
    localStorage.removeItem('fipexToken');
    this.router.navigate(['auth/login']);
  }
}
