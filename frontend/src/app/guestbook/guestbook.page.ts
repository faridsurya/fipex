import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.page.html',
  styleUrls: ['./guestbook.page.scss'],
})
export class GuestbookPage implements OnInit {

  guestBookData:any = {};
  constructor(
    public api: ApiService,
    private router: Router,
    private toastController: ToastController,
    public routes:ActivatedRoute,
    private loadingController: LoadingController,
    private barcodeScanner: BarcodeScanner
  ) { }
  
  ngOnInit() {
    this.guestBookData.exhibition_id = this.routes.snapshot.paramMap.get('id');
    this.getUserLogin();
  }

  dateNow:any;
  ionViewDidEnter() {
    this.dateNow = new Date();
    let dateStart = new Date().setHours(7);
    let dateEnd = new Date().setHours(16);
    
    if(this.dateNow <= new Date(dateEnd) && this.dateNow >= new Date(dateStart)) {
      console.log('oke bisa isi guestbook');
    } else {
      swal({
        title: "Error.",
        text: "Diluar jam kunjung pameran.",
        icon: "error",
        timer: 3000,
      });
      this.router.navigate(['/tabs/tab1'], {replaceUrl: true});
    }
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

  loading!:boolean;
  updateBadge() {
    this.loading = true;
    this.loadingAlert();
    let dt = {
      "secret": this.guestBookData.kode == null ? null:this.guestBookData.kode,
      "user_id": this.userData.id,
      "exhibition_id": this.guestBookData.exhibition_id
    }

    this.api.post('badges/inventories', dt).subscribe(res => {
      if(res) {
        this.simpanBukuTamu();
      }
    }, err => {
      this.loading = false;
      swal({
        title: "Error",
        text: "Satu pengguna hanya diperbolehkan untuk mengisi 1 kali Buku tamu.",
        icon: "error",
        timer: 3000,
      });
      this.router.navigate(['/tabs/tab1'], {replaceUrl: true});
    });
  }

  simpanBukuTamu() {
    this.api.post('guests/books', {comment: this.guestBookData.comments, user_id: this.userData.id}).subscribe(res => {
      if(res) {
        swal({
          title: "Berhasil",
          text: "Buku tamu berhasil disimpan.",
          icon: "success",
          timer: 3000,
        });
        this.router.navigate(['/tabs/tab1'], {replaceUrl: true});
        this.loading = false;
      }
    }, err => {
      swal({
        title: "Error",
        text: JSON.stringify(err),
        icon: "error",
        timer: 3000,
      });
      this.loading = false;
    });
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
        }, 800);
      });
    });
  }

}
