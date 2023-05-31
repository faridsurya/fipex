import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { BeriNilaiPage } from './beri-nilai/beri-nilai.page';
import { SemuaKomentarPage } from './semua-komentar/semua-komentar.page';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { TambahMemberPage } from './tambah-member/tambah-member.page';
import { UpdateProdukPage } from './update-produk/update-produk.page';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
})
export class DetailProdukPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    spaceBetween: 20,
    autoplay: true
  };

  slideOptsKreator = {
    initialSlide: 3,
    slidesPerView: 3,
    speed: 400,
    spaceBetween: 1,
    autoplay: false
  };
  
  slideOptsKreatorSingle = {
    initialSlide: 5,
    slidesPerView: 5,
    speed: 400,
    spaceBetween: 1,
    autoplay: false
  };

  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  constructor(
    public api: ApiService,
    public modalController: ModalController,
    public routes:ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  id:any;
  today:any;
  loading!:boolean;
  async ngOnInit() {
    this.loading = true;
    this.loadingAlert();
    this.id = this.routes.snapshot.paramMap.get('id');
    this.today = new Date();
    this.getUserLogin();
    await this.getDetailProduk();
    this.getKomentar();
    this.getBadges();
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
    this.api.me().subscribe(res => {
      this.userData = res;
      this.isLoggedIn = true;
      // this.getAuthor();
      this.getHasGivenBadge();
    }, err => {
      this.isLoggedIn = false;
    })
  }

  hasGivenData:any = {};
  getHasGivenBadge() {
    this.api.get('user/check/products/'+this.id).subscribe(res => {
      this.hasGivenData = res;
      this.cekWaktu();
    })
  }

  getAuthor() {
    this.api.get('/author/product').subscribe(res => {
      console.log(res);
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

  detailProduk:any = {};
  getDetailProduk() {
    this.api.get('products/'+this.id+'/detail').subscribe(res => {
      this.detailProduk = res;
      this.cekAuthorMember();
    })
  }

  canSendBadgeToProduk!:boolean;
  cekAuthorMember() {
    let dt = this.detailProduk.members.find((e:any) => e.id == this.userData.id);
    if(this.detailProduk.author.id == this.userData.id || dt) {
      this.canSendBadgeToProduk = false;
    } else {
      this.canSendBadgeToProduk = true;
    }
  }

  dataBadges:any = {};
  getBadges() {
    this.api.get('products/'+this.id+'/badges').subscribe(res => {
      this.dataBadges = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  listKomentar:any = [];
  getKomentar() {
    this.api.get('/products/'+ this.id+'/comments').subscribe(res => {
      this.listKomentar = res;
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

  //Modal Beri Nilai
  async beriNilai() {
    const modal = await this.modalController.create({
      component: BeriNilaiPage,
      componentProps: {produk_id: this.id, exhibition_id: this.hasGivenData.exhibitions.id},
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

  async semuaKomentar() {
    const modal = await this.modalController.create({
      component: SemuaKomentarPage,
      componentProps: {produk_id: this.id},
      mode: "md",
      cssClass: 'modal-class',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 1]
    });
    return await modal.present();
  }

  async tambahMember() {
    const modal = await this.modalController.create({
      component: TambahMemberPage,
      componentProps: {produk_id: this.id},
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

  async updateProduk() {
    const modal = await this.modalController.create({
      component: UpdateProdukPage,
      componentProps: {detailProduk: this.detailProduk},
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

  gotoLogin() {
    this.router.navigate(['auth/login'], {replaceUrl: true});
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
