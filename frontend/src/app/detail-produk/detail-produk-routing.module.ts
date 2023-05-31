import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProdukPage } from './detail-produk.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProdukPage
  },
  {
    path: 'beri-nilai',
    loadChildren: () => import('./beri-nilai/beri-nilai.module').then( m => m.BeriNilaiPageModule)
  },
  {
    path: 'semua-komentar',
    loadChildren: () => import('./semua-komentar/semua-komentar.module').then( m => m.SemuaKomentarPageModule)
  },
  {
    path: 'tambah-member',
    loadChildren: () => import('./tambah-member/tambah-member.module').then( m => m.TambahMemberPageModule)
  },
  {
    path: 'update-produk',
    loadChildren: () => import('./update-produk/update-produk.module').then( m => m.UpdateProdukPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProdukPageRoutingModule {}
