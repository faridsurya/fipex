import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListGuestbookPage } from './list-guestbook.page';

const routes: Routes = [
  {
    path: '',
    component: ListGuestbookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListGuestbookPageRoutingModule {}
