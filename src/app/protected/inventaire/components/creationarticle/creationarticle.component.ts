import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-creationarticle',
  templateUrl: './creationarticle.component.html',
  styleUrls: ['./creationarticle.component.scss']
})
export class CreationarticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 
}
export class Creationarticle  {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';
}
