import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { ImageUploaderPage } from 'src/app/image-uploader/image-uploader.page';
import { ApiService } from 'src/app/services/api.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData:any = {};
  constructor(
    public api: ApiService,
    public router:Router,
    public actionSheetController:ActionSheetController,
    public modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  type = 'password';
  show() {
    this.type == 'password' ? this.type = 'text': this.type = 'password';
  }

  loading!:boolean;
  login() {
    this.loading = true;
    this.api.post('auth/login', this.userData).subscribe(res => {
      this.cek(res);
      this.loading = false;
    }, err => {
      this.loading = false;
      swal({
        title: "Error",
        text: JSON.stringify(err.error.message),
        icon: "error",
        timer: 3000,
      });
    });
  }

  cek(res:any) {
    localStorage.setItem('fipexToken',JSON.stringify(res.token));
    this.router.navigate(['/tabs/tab2/0']);
  }

}
