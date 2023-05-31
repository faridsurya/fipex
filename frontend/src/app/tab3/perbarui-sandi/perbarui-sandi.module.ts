import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerbaruiSandiPageRoutingModule } from './perbarui-sandi-routing.module';

import { PerbaruiSandiPage } from './perbarui-sandi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerbaruiSandiPageRoutingModule
  ],
  declarations: [PerbaruiSandiPage]
})
export class PerbaruiSandiPageModule {}
