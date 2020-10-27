import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInventaireComponent } from './pages/homeInventaire/homeInventaire.page';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { InventaireComponent, DialogInventaireComponent } from './components/inventaire/inventaire.component';
import { MenuInventaireComponent } from './components/menuInventaire/menuInventaire.component';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderInventaireComponent } from './components/headerInventaire/headerInventaire.component';
import { QrScannerComponent } from 'angular2-qrscanner';
import { CoreModule } from 'src/app/core/core.module';
import { ScannerComponent, PopupInfosComponent, AlertInfoComponent } from './components/scanner/scanner.component';
import { CreationarticleComponent } from './components/creationarticle/creationarticle.component';
import { DescriptionArticleComponent } from './pages/descriptionArticle/descriptionArticle.page';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerPageComponent } from './pages/scannerPage/scannerPage.page';
import { CreationarticlePage } from './pages/creationarticle/creationarticle.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    PipeModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
    ZXingScannerModule,
    NgxQRCodeModule ,
    FormsModule ,
    NgxPrintModule,
  ],
  declarations: [
    HeaderInventaireComponent,
    HomeInventaireComponent,
    DescriptionArticleComponent,
    ScannerComponent,
    CreationarticleComponent,
    InventaireComponent,
    MenuInventaireComponent,
    QrScannerComponent,
    PopupInfosComponent,
    ScannerPageComponent,
    DialogInventaireComponent,
    AlertInfoComponent,
    CreationarticlePage
  ],
  entryComponents: [
    PopupInfosComponent, DialogInventaireComponent, AlertInfoComponent
  ],
  providers: [],
})
export class InventaireModule { }

