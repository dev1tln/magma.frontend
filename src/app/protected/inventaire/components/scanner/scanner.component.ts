import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Location } from '@angular/common';
import { DescriptionArticleService } from 'src/app/shared/services/descriptionArticle.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  styles: []
})
export class ScannerComponent {

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  qrCode: string='';

  constructor(
    private _bottomSheet: MatBottomSheet,
    private location: Location,
    private descriptionArticle: DescriptionArticleService,

  ) { }

  retourPagePrecedente() {
    this.location.back();
    console.log();
  }

  openBottomSheet(): void {
    this.descriptionArticle.setArticle({
      article_id:"10350451", nno: "Bla613553", numref: "ARM1", 
    });
    this._bottomSheet.open(PopupInfosComponent);
  }

  scan(event) {
    alert(event);
    this.qrCode = event;
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
       } ;
    }
    else {
      return {
        article_id: null,
        nno: null,
        lib: null,
        numref: null,
       } ;
    }
  }
}


@Component({
  selector: 'app-popup-infos',
  templateUrl: './popup-infos/popup-infos.component.html',
})
export class PopupInfosComponent implements OnInit {
 
  article: any;

  constructor(
    private descriptionArticle: DescriptionArticleService,
    private _bottomSheetRef: MatBottomSheetRef<PopupInfosComponent>) {}

    ngOnInit(): void {
      this.article= this.descriptionArticle.getArticle();
    }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}




