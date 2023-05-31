import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-beri-nilai',
  templateUrl: './beri-nilai.page.html',
  styleUrls: ['./beri-nilai.page.scss'],
})
export class BeriNilaiPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private api: ApiService
  ) { }

  produk_id:any;
  ngOnInit() {
    this.produk_id = this.navParams.get('produk_id');
    this.data.exhibition_id = this.navParams.get('exhibition_id');
    this.getBadges(this.produk_id);
    this.getMyBadges();
    this.today = new Date();
    this.getUserLogin();
  }

  userData:any = {};
  isLoggedIn!:boolean;
  today:any;
  getUserLogin() {
    this.api.me().subscribe(res => {
      this.userData = res;
      this.isLoggedIn = true;
      this.getHasGivenBadge();
    }, err => {
      this.isLoggedIn = false;
    })
  }

  hasGivenData:any = {};
  getHasGivenBadge() {
    this.api.get('user/check/products/'+this.produk_id).subscribe(res => {
      this.hasGivenData = res;
      this.cekWaktu();
    })
  }

  canSendScore!:boolean;
  cekWaktu() {
    if(this.today >= new Date(this.hasGivenData.exhibitions?.scoring_start) && this.today <= new Date(this.hasGivenData.exhibitions?.scoring_end)) {
      this.canSendScore = true;
    } else {
      this.canSendScore = false;
    }
  }

  myBadges:any = {};
  getMyBadges() {
    this.api.get('user/badges').subscribe(res => {
      this.myBadges = res;
      this.badgeTemp = this.myBadges.badge_count;
      this.data.badge_type = this.myBadges.badge_type;
    })
  }

  dataBadges:any = {};
  getBadges(id:any) {
    this.api.get('products/'+id+'/badges').subscribe(res => {
      this.dataBadges = res;
    })
  }

  data:any = {};
  loading!:boolean;
  simpan() {
    this.loading = true;
    this.loadingAlert();
    this.api.post('user/send/badge/product/'+this.produk_id, this.data).subscribe(res => {
      swal({
        title: "Berhasil",
        text: "Berhasil memberikan nilai.",
        icon: "success",
        timer: 3000,
      });
      this.loading = false;
      this.dismiss();
    }, err => {
      this.loading = false;
      swal({
        title: "Error",
        text: JSON.stringify(err),
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

  badgeClicked:any;
  badgeTemp:any;
  klikMyBadge(badge_type:any, n:any) {
    if(this.badgeTemp == n) {
      if(this.myBadges.badge_count >= n) {
        this.badgeClicked = n;
      }
      if(badge_type == 'silver') {
        if(this.dataBadges.silver.points > 0) {
          this.dataBadges.silver.points -= 1;
          this.myBadges.badge_count += 1;
        }
        this.dataBadges.silver.points += 1;
        this.myBadges.badge_count -= 1;
      } else if(badge_type == 'gold') {
        if(this.dataBadges.gold.points > 0) {
          this.dataBadges.gold.points -= 1;
          this.myBadges.badge_count += 1;
        }
        this.dataBadges.gold.points += 1;
        this.myBadges.badge_count -= 1;
      } else if(badge_type == 'platinum') {
        if(this.dataBadges.platinum.points > 0) {
          this.dataBadges.platinum.points -= 1;
          this.myBadges.badge_count += 1;
        }
        this.dataBadges.platinum.points += 1;
        this.myBadges.badge_count -= 1;
      }
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
