import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-guestbook',
  templateUrl: './list-guestbook.page.html',
  styleUrls: ['./list-guestbook.page.scss'],
})
export class ListGuestbookPage implements OnInit {
  
  constructor(
    public api: ApiService,
    private router: Router,
    private toastController: ToastController,
    private barcodeScanner: BarcodeScanner,
    private modalController: ModalController
  ) { }
  
  loading!:boolean;
  serverImg = 'https://apis.ruang-ekspresi.id/fipex/';
  ngOnInit(): void {
    this.loading = true;
    this.getUserLogin();
    this.getGuestbook();
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

  listGuestbook:any = [];
  listGuestbookTemp:any = [];
  getGuestbook() {
    this.api.get('guests/books/limit/'+this.n).subscribe(res => {
      this.listGuestbook = res;
      this.listGuestbookTemp = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  n = 10;
  fromInfinite:any = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  loadData(event:any) {
    this.fromInfinite = [];
    this.n = this.n+10;
    setTimeout(() => {
      event.target.complete();
      this.api.get('guests/books/limit/'+this.n).subscribe(res => {
        this.fromInfinite = res;
        this.loading = false;
        this.listGuestbook = this.listGuestbook.concat(this.fromInfinite);
      }, err => {
        this.loading = false;
      })

    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  initializeItems(): void {
    this.listGuestbook = this.listGuestbookTemp;
  }

  searchTerm: string = '';
  searchChanged(evt:any) {

    this.initializeItems();

    const searchTerm = evt.srcElement.value;
    
    if (!searchTerm) {
      return;
    }

    this.listGuestbook = this.listGuestbook.filter((guest:any) => {
      if (guest.created_by.name && searchTerm) {
        if (guest.created_by.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        if (guest.comment && searchTerm) {
          if (guest.comment.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
          if (guest.badge_type && searchTerm) {
            if (guest.badge_type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
              return true;
            }
            return false;
          }
          return false;
        }
        return false;
      }
      return false;
    });

  }

}
