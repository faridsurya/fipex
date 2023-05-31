import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonInfiniteScroll, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ApiService } from '../services/api.service';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-peserta-fitalks',
  templateUrl: './peserta-fitalks.page.html',
  styleUrls: ['./peserta-fitalks.page.scss'],
})
export class PesertaFitalksPage implements OnInit {
  constructor(
    public api: ApiService,
    private router: Router,
    private toastController: ToastController,
    private barcodeScanner: BarcodeScanner,
    private modalController: ModalController,
    public popoverController: PopoverController
  ) { }
  
  loading!:boolean;
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  ngOnInit(): void {
    this.loading = true;
    this.getUserLogin();
    this.getFiTalks();
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

  listFitalks:any = [];
  listFitalksTemp:any = [];
  getFiTalks() {
    this.api.get('fitalks').subscribe(res => {
      this.listFitalks = res;
      this.listFitalksTemp = res;
      this.parsePeserta();
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  jumlahHadir = 0;
  jumlahBelumHadir = 0;
  jumlahH:any = [];
  jumlahB:any = [];
  parsePeserta() {
    this.jumlahH = this.listFitalks.filter((e:any) => e.alreadyPresent == 1 );
    this.jumlahB = this.listFitalks.filter((e:any) => e.alreadyPresent == 0 );
    this.jumlahHadir = this.jumlahH.length;
    this.jumlahBelumHadir = this.jumlahB.length;
  }

  showData = 'semua';
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterComponent,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then(res => {
      if(res.data) {
        this.showData = res.data;
      }
    })
    return await popover.present();
  }

  initializeItems(): void {
    this.listFitalks = this.listFitalksTemp;
  }

  searchTerm: string = '';
  searchChanged(evt:any) {

    this.initializeItems();

    const searchTerm = evt.srcElement.value;
    
    if (!searchTerm) {
      return;
    }

    this.listFitalks = this.listFitalks.filter((guest:any) => {
      if (guest.name && searchTerm) {
        if (guest.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return false;
    });

  }

}
