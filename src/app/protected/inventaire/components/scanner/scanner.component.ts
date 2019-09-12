import { Component, ViewChild, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/model';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./scanner.component.scss'],
  styles: []
})
export class ScannerComponent implements OnInit {

  @ViewChild(QrScannerComponent, { static: true }) qrScannerComponent: QrScannerComponent;
  res: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      alert(result);
    });
  }
  // qrDecoup(): string {
  //   if (this.art !== null) {
  //     var splits = this.art.numref.split("|");
  //     this.art.numref = splits[0];
  //     this.res = this.art.numref;
  //   }
  //   else {
  //     this.res = '';
  //   }
  //   return this.res;
  // }
}

