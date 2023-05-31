import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemuaKomentarPageRoutingModule } from './semua-komentar-routing.module';

import { SemuaKomentarPage } from './semua-komentar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemuaKomentarPageRoutingModule
  ],
  declarations: [SemuaKomentarPage]
})
export class SemuaKomentarPageModule {}
