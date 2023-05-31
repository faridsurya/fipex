import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesertaFitalksPageRoutingModule } from './peserta-fitalks-routing.module';

import { PesertaFitalksPage } from './peserta-fitalks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesertaFitalksPageRoutingModule
  ],
  declarations: [PesertaFitalksPage]
})
export class PesertaFitalksPageModule {}
