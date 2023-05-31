import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerbaruiSandiPage } from './perbarui-sandi.page';

const routes: Routes = [
  {
    path: '',
    component: PerbaruiSandiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerbaruiSandiPageRoutingModule {}
