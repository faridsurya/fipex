import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeriNilaiPageRoutingModule } from './beri-nilai-routing.module';

import { BeriNilaiPage } from './beri-nilai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeriNilaiPageRoutingModule
  ],
  declarations: [BeriNilaiPage]
})
export class BeriNilaiPageModule {}
