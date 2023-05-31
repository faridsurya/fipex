import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProdukPage } from './update-produk.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProdukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProdukPageRoutingModule {}
