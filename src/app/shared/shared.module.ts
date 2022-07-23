import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
