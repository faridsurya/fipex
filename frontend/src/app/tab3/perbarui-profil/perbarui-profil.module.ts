import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerbaruiProfilPageRoutingModule } from './perbarui-profil-routing.module';

import { PerbaruiProfilPage } from './perbarui-profil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerbaruiProfilPageRoutingModule
  ],
  declarations: [PerbaruiProfilPage]
})
export class PerbaruiProfilPageModule {}
