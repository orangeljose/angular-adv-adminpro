import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data:{ titulo : 'Dashboard'}},
          { path: 'progress', component: ProgressComponent, data:{ titulo : 'ProgressBar'}},
          { path: 'grafica1', component: Graph1Component, data:{ titulo : 'Grafica #1'}},
          { path: 'account-settings', component: AccountSettingsComponent, data:{ titulo : 'Tema'}},
          { path: 'promises', component: PromisesComponent, data:{ titulo : 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data:{ titulo : 'RXJS'}},
          { path: 'profile', component: PerfilComponent, data:{ titulo : 'Perfil de Usuario'}},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
