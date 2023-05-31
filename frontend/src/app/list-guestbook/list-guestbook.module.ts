import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListGuestbookPageRoutingModule } from './list-guestbook-routing.module';

import { ListGuestbookPage } from './list-guestbook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListGuestbookPageRoutingModule
  ],
  declarations: [ListGuestbookPage]
})
export class ListGuestbookPageModule {}
