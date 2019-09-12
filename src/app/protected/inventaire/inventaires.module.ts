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
import { DescriptionArticleComponent } from './pages/descriptionArticle/descriptionArticle.page';
import { DescriptionArticleService } from '../../shared/services/descriptionArticle.service';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { SecurePipe } from '../../shared/pipes/secure.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    PipeModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
  ],
  declarations: [
    HeaderInventaireComponent,
    HomeInventaireComponent,
    DescriptionArticleComponent,
    ScannerComponent,
    InventaireComponent,
    MenuInventaireComponent,
    QrScannerComponent,
  ],
  providers: [],
})
export class InventaireModule { }

