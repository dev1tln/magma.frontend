import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { InventaireService } from 'src/app/shared/services/inventaires.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  styles: []
})
export class ScannerComponent {

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  qrCode: string = '';

  constructor(
    private auth: AuthService,
    private inventaireService: InventaireService,
  ) { }

  scan(event) {
    alert(event);
    this.qrCode = event;
    this.inventaireService.ajouterArticleScanne(this.getQrDecoup());
  }

  getQrCode(): string {
    return this.qrCode;
  }

  getQrDecoup(): any {
    if (this.qrCode.includes('|')) {
      var splits = this.qrCode.split("|");
      return {
        article_id: splits[0],
        nno: splits[1],
        lib: splits[2],
        numref: splits[3],
      };
    }
    else {
      return {
        article_id: null,
        nno: null,
        lib: null,
        numref: null,
      };
    }
  }
}

