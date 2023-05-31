import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuatAkunPageRoutingModule } from './buat-akun-routing.module';

import { BuatAkunPage } from './buat-akun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuatAkunPageRoutingModule
  ],
  declarations: [BuatAkunPage]
})
export class BuatAkunPageModule {}
