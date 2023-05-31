import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-semua-komentar',
  templateUrl: './semua-komentar.page.html',
  styleUrls: ['./semua-komentar.page.scss'],
})
export class SemuaKomentarPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getUserLogin();
    let produk_id = this.navParams.get('produk_id');
    this.getKomentar(produk_id);
  }

  userData:any = {};
  isLoggedIn!:boolean;
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  getUserLogin() {
    this.api.me().subscribe(res => {
      this.userData = res;
      this.isLoggedIn = true;
    }, err => {
      this.isLoggedIn = false;
    })
  }
  
  listKomentar:any = [];
  getKomentar(id:any) {
    this.api.get('/products/'+ id+'/comments').subscribe(res => {
      this.listKomentar = res;
    })
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
