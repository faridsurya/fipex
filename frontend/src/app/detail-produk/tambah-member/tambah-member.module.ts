import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahMemberPageRoutingModule } from './tambah-member-routing.module';

import { TambahMemberPage } from './tambah-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahMemberPageRoutingModule
  ],
  declarations: [TambahMemberPage]
})
export class TambahMemberPageModule {}
