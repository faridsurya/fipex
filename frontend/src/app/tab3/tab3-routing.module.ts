import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'perbarui-profil',
    loadChildren: () => import('./perbarui-profil/perbarui-profil.module').then( m => m.PerbaruiProfilPageModule)
  },
  {
    path: 'perbarui-sandi',
    loadChildren: () => import('./perbarui-sandi/perbarui-sandi.module').then( m => m.PerbaruiSandiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
