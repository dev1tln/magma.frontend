import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-inventaire',
  templateUrl: './homeInventaire.page.html',
  styleUrls: ['./homeInventaire.page.scss']
})


export class HomeInventaireComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.auth.detention_id == null) {
      this.router.navigateByUrl('/unite/choix');
    }
  }
}


