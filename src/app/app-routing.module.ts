import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { Graph1Component } from './page/graph1/graph1.component';
import { NotpagefoundComponent } from './page/notpagefound/notpagefound.component';
import { PagesComponent } from './page/pages.component';
import { ProgressComponent } from './page/progress/progress.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'grafica1', component: Graph1Component},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: NotpagefoundComponent},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
