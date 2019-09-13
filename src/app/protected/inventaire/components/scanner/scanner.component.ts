import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  styles: []
})
export class ScannerComponent {

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  scan(event) {
    alert(event);
  }
}

