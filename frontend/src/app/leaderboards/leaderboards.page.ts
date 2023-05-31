import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.page.html',
  styleUrls: ['./leaderboards.page.scss'],
})
export class LeaderboardsPage implements OnInit {

  slideOptsKategori = {
    initialSlide: 5,
    slidesPerView: 5,
    speed: 400,
    spaceBetween: 1,
    autoplay: true
  };
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  loading!:boolean;
  constructor(
    public api: ApiService,
    private router: Router,
    public routes:ActivatedRoute,
    private loadingController: LoadingController,
  ) { }
  
  ngOnInit(): void {
    this.getKategori();
    // this.getProduk(this.category);
    setInterval(() => {
      this.getProductByKategori();
    }, 60000);
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

  listKategori:any = [];
  getKategori() {
    // this.loadingAlert();
    this.loading = true;
    this.api.get('categories').subscribe(res => {
      this.listKategori = res;
      this.getProductByKategori();
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  leaderboards:any = {};
  getProductByKategori() {
    for(var i=0; i<this.listKategori.length; i++) {
      let idCat = this.listKategori[i].id;
      if(this.listKategori[i].id) {
        this.api.get('products/leaderboard/categories/'+idCat).subscribe(res => {
          if(this.leaderboards[idCat] == null) {
            this.leaderboards[idCat] = [];
          }
          this.leaderboards[idCat] = res;
        })
      }
    }
    if(!this.catSelected) {
      this.catSelected = this.listKategori[0].id;
    }
    this.loadingController.dismiss();
  }

  catSelected:any;
  showList(id:any) {
    this.catSelected = id;
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
