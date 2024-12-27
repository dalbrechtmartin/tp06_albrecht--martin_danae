import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'account',
    component: AccountPageComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: 'login' }, // Redirection pour les chemins inexistant
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountPageComponent,
    LoginPageComponent,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule {}