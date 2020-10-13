import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '',  redirectTo: 'register', pathMatch: 'full'},
  { path: 'register', loadChildren: () => import('../app/pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('../app/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'notice-privacy', loadChildren: () => import('../app/pages/notice-privacy/notice-privacy.module')
          .then(m => m.NoticePrivacyModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
