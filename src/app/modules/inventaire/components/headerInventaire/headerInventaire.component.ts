import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from '../menuInventaire/sidenav.service';

@Component({
  selector: 'app-header-inventaire',
  templateUrl: './headerInventaire.component.html',
  styleUrls: ['./headerInventaire.component.scss']
})
export class HeaderInventaireComponent implements OnInit {
  constructor(
    private sidenav: SidenavService) { }
Ò
  @Input() title: string;

  ngOnInit(): void { }

  toggleSidenav() {
    this.sidenav.open();
  }
}
