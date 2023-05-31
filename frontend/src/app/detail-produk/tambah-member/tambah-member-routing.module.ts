import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahMemberPage } from './tambah-member.page';

const routes: Routes = [
  {
    path: '',
    component: TambahMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahMemberPageRoutingModule {}
