import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuatAkunPage } from './buat-akun.page';

const routes: Routes = [
  {
    path: '',
    component: BuatAkunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuatAkunPageRoutingModule {}
