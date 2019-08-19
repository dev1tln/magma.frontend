import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInventaireComponent } from './pages/homeInventaire/homeInventaire.page';
import { LayerModule } from '../../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { InventaireComponent } from './components/listInventaire/inventaire.component';
import { MenuInventaireComponent } from './components/menuInventaire/menuInventaire.component';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderInventaireComponent } from './components/headerInventaire/headerInventaire.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    LayerModule,
  ],
  declarations: [
    HeaderInventaireComponent,
    HomeInventaireComponent,
    InventaireComponent,
    MenuInventaireComponent,
  ],
  providers: [],
})
export class InventaireModule { }
