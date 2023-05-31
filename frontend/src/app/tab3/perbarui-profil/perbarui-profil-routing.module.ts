import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerbaruiProfilPage } from './perbarui-profil.page';

const routes: Routes = [
  {
    path: '',
    component: PerbaruiProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerbaruiProfilPageRoutingModule {}
