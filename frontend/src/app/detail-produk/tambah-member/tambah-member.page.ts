import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-tambah-member',
  templateUrl: './tambah-member.page.html',
  styleUrls: ['./tambah-member.page.scss'],
})
export class TambahMemberPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private toastController: ToastController,
    private api: ApiService
  ) { }

  produk_id:any;
  ngOnInit() {
    this.getUserLogin();
    this.produk_id = this.navParams.get('produk_id');
    this.getAllUsers();
  }

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
  
  listUsers:any = [];
  listUsersTemp:any = [];
  loading!:boolean;
  getAllUsers() {
    this.loading = true;
    this.api.get('/users').subscribe(res => {
      this.listUsers = res;
      this.listUsersTemp = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  initializeItems(): void {
    this.listUsers = this.listUsersTemp;
  }

  searchTerm: string = '';
  searchChanged(evt:any) {

    this.initializeItems();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.listUsers = this.listUsers.filter((product:any) => {
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

  jadikanMember(n:any) {
    swal({
      title: "Konfirmasi",
      text: "Anda yakin akan menjadikan "+n.name+" sebagai member projek?",
      buttons: ['Batal', 'Ya'],
      dangerMode: false,
    })
    .then((oke) => {
      if (oke) {
        if(n.id != this.userData.id) {
          let dt = {
            product_id: this.produk_id,
            user_id: n.id
          }
          this.api.post('products/members', dt).subscribe(res => {
            swal({
              title: "Berhasil",
              text: "Member berhasil ditambahkan ke projek anda.",
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
          this.toastController
          .create({
            message: 'Tidak bisa menambahkan diri sendiri.',
            duration: 2000,
            color: "danger",
          })
          .then((toastEl) => {
            toastEl.present();
          });
        }
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
