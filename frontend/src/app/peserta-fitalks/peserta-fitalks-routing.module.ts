import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesertaFitalksPage } from './peserta-fitalks.page';

const routes: Routes = [
  {
    path: '',
    component: PesertaFitalksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesertaFitalksPageRoutingModule {}
