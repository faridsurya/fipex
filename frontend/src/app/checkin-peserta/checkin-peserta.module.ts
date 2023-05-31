import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckinPesertaPageRoutingModule } from './checkin-peserta-routing.module';

import { CheckinPesertaPage } from './checkin-peserta.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,
    CheckinPesertaPageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [CheckinPesertaPage]
})
export class CheckinPesertaPageModule {}
