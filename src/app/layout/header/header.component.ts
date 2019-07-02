import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SidenavService } from '../../inventaire/components/menu/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private sidenav: SidenavService) { }

  @Input() title: string;

  ngOnInit(): void { }

  toggleSidenav() {
    this.sidenav.open();
  }
}
