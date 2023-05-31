import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { SweetAlert } from 'sweetalert/typings/core';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ScanQrcodePage } from './scan-qrcode/scan-qrcode.page';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 2,
    speed: 400,
    spaceBetween: 5,
    autoplay: true
  };

  sliderOption = {
    slidesPerView: 2,
    spaceBetween: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  slideOptsKategori = {
    initialSlide: 5,
    slidesPerView: 5,
    speed: 400,
    spaceBetween: 1,
    autoplay: false
  };

  constructor(
    public api: ApiService,
    private router: Router,
    private toastController: ToastController,
    private barcodeScanner: BarcodeScanner,
    private modalController: ModalController
  ) { }
  
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  loading!:boolean;
  ngOnInit(): void {
    this.loading = true;
    this.getUserLogin();
    this.getBanners();
    this.getKategori();
    this.getGuestbook();
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

  userData:any = {};
  isLoggedIn!:boolean;
  getUserLogin() {
    this.api.me().subscribe(res=>{
      this.userData = res;
      this.isLoggedIn = true;
    }, error => {
      this.isLoggedIn = false;
    })
  }

  banners:any = [];
  getBanners() {
    this.api.get('banners').subscribe(res => {
      this.cekBanners(res);
    })
  }

  cekBanners(res:any) {
    if(res) {
      this.banners = res['banners'];
    }
  }

  listKategori:any = [];
  getKategori() {
    this.api.get('categories').subscribe(res => {
      this.listKategori = res;
    })
  }

  listGuestbook:any = [];
  getGuestbook() {
    this.api.get('guests/books/limit/10').subscribe(res => {
      this.listGuestbook = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  scannedData:any;
  act:any;
  dateNow:any;
  scanQrCode(act:any) {
    this.dateNow = new Date();
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Arahkan kamera ke QrCode yang tersedia',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      this.act = act;
      this.scannedData = barcodeData.text;
      if(this.scannedData) {
        if(act == 'detail') {
          this.cekProduk();
        } else if(act == 'bukutamu') {
          this.bukutamu();
        }
      }
    }).catch(err => {
      // swal({
      //   title: "Error",
      //   text: JSON.stringify(err),
      //   icon: "error",
      //   timer: 3000,
      // });
      this.scanQrCodeBrowser(act);
    });
  }

  async scanQrCodeBrowser(act:any) {
    const modal = await this.modalController.create({
      component: ScanQrcodePage,
      componentProps: {act: act},
      mode: "md",
      cssClass: 'modal-class',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 1]
    });
    
    modal.onDidDismiss().then(async res => {
      if(res.data) {
        this.scannedData = res.data?.qrcode;
        this.act = res.data?.act;
        if(this.scannedData) {
          let dateStart = new Date().setHours(7);
          let dateEnd = new Date().setHours(16);
          
          if(this.dateNow <= new Date(dateEnd) && this.dateNow >= new Date(dateStart)) {
            if(this.act == 'detail') {
              this.cekProduk();
            } else if(this.act == 'bukutamu') {
              this.bukutamu();
            }
          } else {
            swal({
              title: "Error.",
              text: "Diluar jam kunjung pameran.",
              icon: "error",
              timer: 3000,
            });
          }
        }
      }
    });

    return await modal.present();
  }

  async bukutamu() {
    await this.getUserLogin();
    if(this.isLoggedIn) {
      this.router.navigate(['/guestbook', this.scannedData], {replaceUrl: true});
    } else {
      swal({
        title: "Masuk ke akun dahulu.",
        text: "Dibutuhkan akses masuk untuk mengisi buku tamu.",
        icon: "error",
        timer: 3000,
      });
      this.router.navigate(['/auth/login']);
    }
  }

  cekProduk() {
    this.api.get('products/'+this.scannedData).subscribe(res => {
      if(res) {
        this.toastController
        .create({
          message: 'Produk ditemukan.',
          duration: 2000,
          color: "primary",
        })
        .then((toastEl) => {
          toastEl.present();
        });
        this.router.navigate(['/detail-produk', this.scannedData], {replaceUrl: true});
      } else {
        swal({
          title: "Error",
          text: "Produk tidak ditemukan.",
          icon: "error",
          timer: 3000,
        });
      }
    }, err => {
      swal({
        title: "Error",
        text: "Produk tidak ditemukan.",
        icon: "error",
        timer: 3000,
      });
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

}
