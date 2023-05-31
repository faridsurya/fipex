import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemuaKomentarPage } from './semua-komentar.page';

const routes: Routes = [
  {
    path: '',
    component: SemuaKomentarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemuaKomentarPageRoutingModule {}
