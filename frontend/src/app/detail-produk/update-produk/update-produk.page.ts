import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ApiService } from 'src/app/services/api.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageUploaderPage } from 'src/app/image-uploader/image-uploader.page';

@Component({
  selector: 'app-update-produk',
  templateUrl: './update-produk.page.html',
  styleUrls: ['./update-produk.page.scss'],
})
export class UpdateProdukPage implements OnInit {

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
  detailProduk:any = {};
  ngOnInit() {
    this.getUserLogin();
    this.detailProduk = this.navParams.get('detailProduk');
    console.log(this.detailProduk);
    
  }

  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  userData:any = {};
  isLoggedIn!:boolean;
  getUserLogin() {
    this.api.me().subscribe(res => {
      this.userData = res;
      this.isLoggedIn = true;
    }, err => {
      this.isLoggedIn = false;
    })
  }

  async openViewer(url:any) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: url
      },
      cssClass: 'ion-img-viewer'
    });
 
    return await modal.present();
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
        this.uploadThumbnails(dt);
      } else {
        this.loadingController.dismiss();
      } 
    });
    return await modal.present();
  }

  uploadThumbnails(data:any) {
    this.loadingAlert();
    this.api.post('upload/products/thumbnails/'+this.detailProduk.id, data).subscribe(res => {
      this.getDetailProduk();
      this.toastController
      .create({
        message: 'Thumbnail berhasil diunggah.',
        duration: 2000,
        color: "primary",
      })
      .then((toastEl) => {
        toastEl.present();
      });
    }, err => {
      swal({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 3000,
      });
    })
  }

  getDetailProduk() {
    this.api.get('products/'+this.detailProduk.id+'/detail').subscribe(res => {
      this.detailProduk = res;
    })
  }

  loading!:boolean;
  updateData() {
    swal({
      title: "Konfirmasi",
      text: "Anda yakin ingin perbarui data produk?",
      buttons: ['Batal', 'Ya'],
      dangerMode: false,
    })
    .then((oke) => {
      if (oke) {
        let dt = {
          name: this.detailProduk.name,
          description: this.detailProduk.description,
        }
        this.api.put('products/'+this.detailProduk.id, dt).subscribe(res => {
          swal({
            title: "Berhasil",
            text: "Berhasil memperbarui produk.",
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
