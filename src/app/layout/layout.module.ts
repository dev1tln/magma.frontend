import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NavBarComponent } from './navbar/navbar.component';
import { MenuBarComponent } from './menu/menubar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule],
  declarations: [
    HeaderComponent,
    NavBarComponent,
    MenuBarComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    MenuBarComponent,
    NavBarComponent,
    FooterComponent,
  ],
})
export class LayerModule { }
