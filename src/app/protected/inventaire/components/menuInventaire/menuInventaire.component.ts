import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menuInventaire.component.html',
  styleUrls: ['./menuInventaire.component.scss']
})
export class MenuInventaireComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  mobile: boolean;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService) {
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.mobile = this.breakpointObserver.isMatched('(max-width: 499px)');
  }
}

