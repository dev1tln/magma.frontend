import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventaireService } from 'src/app/shared/services/inventaires.service';


@Component({
  selector: 'app-page-inventaire',
  templateUrl: './homeInventaire.page.html',
  styleUrls: ['./homeInventaire.page.scss'],
  styles: []
})
export class HomeInventaireComponent implements OnInit {
  constructor(
    private inventaire: InventaireService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.inventaire.getAncientInventaire().length === 0) {
      this.router.navigateByUrl('/unite/choix');
    }
  }
}
