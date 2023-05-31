import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detail-produk/:id',
    loadChildren: () => import('./detail-produk/detail-produk.module').then( m => m.DetailProdukPageModule)
  },
  {
    path: 'guestbook/:id',
    loadChildren: () => import('./guestbook/guestbook.module').then( m => m.GuestbookPageModule)
  },
  {
    path: 'auth/menu',
    loadChildren: () => import('./auth/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'auth/buat-akun',
    loadChildren: () => import('./auth/buat-akun/buat-akun.module').then( m => m.BuatAkunPageModule)
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'list-guestbook',
    loadChildren: () => import('./list-guestbook/list-guestbook.module').then( m => m.ListGuestbookPageModule)
  },
  {
    path: 'checkin-peserta',
    loadChildren: () => import('./checkin-peserta/checkin-peserta.module').then( m => m.CheckinPesertaPageModule)
  },
  {
    path: 'peserta-fitalks',
    loadChildren: () => import('./peserta-fitalks/peserta-fitalks.module').then( m => m.PesertaFitalksPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
