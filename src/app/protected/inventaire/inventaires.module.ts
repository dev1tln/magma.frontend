import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInventaireComponent } from './pages/homeInventaire/homeInventaire.page';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { MenuInventaireComponent } from './components/menuInventaire/menuInventaire.component';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderInventaireComponent } from './components/headerInventaire/headerInventaire.component';
import { QrScannerComponent } from 'angular2-qrscanner';
import { CoreModule } from 'src/app/core/core.module';
import { ScannerComponent } from './components/scanner/scanner.component';
@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
  ],
  declarations: [
    HeaderInventaireComponent,
    HomeInventaireComponent,
    ScannerComponent,
    InventaireComponent,
    MenuInventaireComponent,
    QrScannerComponent,
  ],
  providers: [],
})
export class InventaireModule { }

