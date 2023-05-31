import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQrcodePageRoutingModule } from './scan-qrcode-routing.module';

import { ScanQrcodePage } from './scan-qrcode.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,
    ScanQrcodePageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ScanQrcodePage]
})
export class ScanQrcodePageModule {}
