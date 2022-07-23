import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NotpagefoundComponent } from './page/notpagefound/notpagefound.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header/header.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { ProgressComponent } from './page/progress/progress.component';
import { Graph1Component } from './page/graph1/graph1.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './page/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotpagefoundComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ProgressComponent,
    Graph1Component,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
