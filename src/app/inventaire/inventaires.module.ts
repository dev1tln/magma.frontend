import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageInventaireComponent } from './pages/inventaire/inventaire.page';
import { LayerModule } from '../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { InventaireComponent } from './components/listInventaire/inventaire.component';
import { MenuInventaireComponent } from './components/menu/menubar.component';
import { AppRoutingModule } from '../app-routing.module';

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
    PageInventaireComponent,
    InventaireComponent,
    MenuInventaireComponent,
  ],
  exports: [MenuInventaireComponent, PageInventaireComponent],
  providers: [],
})
export class InventaireModule {

}
