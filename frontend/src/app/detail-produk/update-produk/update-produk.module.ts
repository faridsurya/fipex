import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProdukPageRoutingModule } from './update-produk-routing.module';

import { UpdateProdukPage } from './update-produk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProdukPageRoutingModule
  ],
  declarations: [UpdateProdukPage]
})
export class UpdateProdukPageModule {}
