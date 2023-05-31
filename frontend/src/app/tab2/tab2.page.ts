import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  slideOptsKategori = {
    initialSlide: 5,
    slidesPerView: 5,
    speed: 400,
    spaceBetween: 1,
    autoplay: true
  };
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  constructor(
    public api: ApiService,
    private router: Router,
    public routes:ActivatedRoute,
    private loadingController: LoadingController,
  ) { }
  
  category:any;
  ngOnInit(): void {
    this.category = this.routes.snapshot.paramMap.get('id');
    this.getKategori();
    this.getProduk(this.category);
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
    this.api.get('categories').subscribe(res => {
      this.listKategori = res;
    })
  }

  listProduk:any = [];
  listProdukTemp:any = [];
  loading!:boolean;
  n = 5;
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  getProduk(category:any) {
    this.category = category;
    this.loading = true;
    this.listProduk = [];
    if(category == 0) {
      this.api.get('products').subscribe(res => {
        this.listProduk = res;
        this.listProdukTemp = res;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
    } else {
      this.api.get('products/categories/'+category).subscribe(res => {
        this.listProduk = res;
        this.listProdukTemp = res;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
    }
  }

  loadData(event:any) {
    this.n = this.n+5;
    setTimeout(() => {
      event.target.complete();
      this.getProduk(this.category);
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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

  initializeItems(): void {
    this.listProduk = this.listProdukTemp;
  }

  searchTerm: string = '';
  searchChanged(evt:any) {

    this.initializeItems();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.listProduk = this.listProduk.filter((product:any) => {
      if (product.name && searchTerm) {
        if (product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    });

  }

}
