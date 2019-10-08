import { Component, ViewChild, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatBottomSheet, MatBottomSheetRef, MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Location } from '@angular/common';
import { DescriptionArticleService } from 'src/app/shared/services/descriptionArticle.service';
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
  qrCode = '';

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private location: Location,
    private descriptionArticle: DescriptionArticleService,
    private inventaireService: InventaireService,
  ) { }

  retourPagePrecedente() {
    this.location.back();
    console.log();
  }

  openBottomSheet(): void {
    this.descriptionArticle.setArticle(this.getQrDecoup());
    this._bottomSheet.open(PopupInfosComponent);
  }

  scan(event) {
    if (this.qrCode !== event) {
      this.qrCode = event;
      this.inventaireService.ajouterArticleScanne(this.getQrDecoup())
        .then(result => {
          this._snackBar.openFromComponent(AlertInfoComponent, {
          duration: 6000,
          verticalPosition: 'top',
          panelClass: ['alert-succes'],
          data: {bool: 'true', message: ''},
          });
        })
        .catch(
          err => {
            this._snackBar.openFromComponent(AlertInfoComponent, {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['alert-error'],
              data: { bool: 'false', message: err },
          });
        });
      this.openBottomSheet();
    }
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


@Component({
  selector: 'app-popup-infos',
  templateUrl: './popup-infos/popup-infos.component.html',
  styleUrls: ['./popup-infos/popup-infos.component.scss'],
})
export class PopupInfosComponent implements OnInit {

  article: any;

  constructor(
    private descriptionArticle: DescriptionArticleService,
    private _bottomSheetRef: MatBottomSheetRef<PopupInfosComponent>) { }

  ngOnInit(): void {
    this.article = this.descriptionArticle.getArticle();
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'app-alert-infos',
  templateUrl: './alert/alert.component.html',
  styleUrls: ['./alert/alert.component.scss'],
})
export class AlertInfoComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}




