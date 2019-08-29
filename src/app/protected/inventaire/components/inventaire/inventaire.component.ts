import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Inventaire, Article } from 'src/app/shared/models/model';
import { InventaireService } from 'src/app/shared/services/inventaires.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {
  ancientInventaire: Inventaire;
  nouveauInventaire: Inventaire;

  affichageData: Map<string, Article[]>;

  constructor(private inventaireService: InventaireService) { }

  ngOnInit(): void {
    if (this.inventaireService.exist()) {
      this.ancientInventaire = this.inventaireService.getAncientInventaire();
      this.nouveauInventaire = this.inventaireService.getNouveauInventaire();

      this.affichageData = this.groupArticlesByNno();
    }
  }

  groupArticlesByNno() {
    // group by nno
    let result = this.ancientInventaire.articles.reduce((groups, article) => {
      const nno = article.nno;
      const array = groups.get(nno) || [];
      array.push(article);
      groups.set(nno, array);
      return groups;
    }, new Map<string, Article[]>());

    result = this.nouveauInventaire.articles.reduce((groups, article) => {
      const nno = article.nno;
      const array = groups.get(nno) || [];
      if (!array.includes(article)) { array.push(article); }
      groups.set(nno, array);
      return groups;
    }, result);

    console.log(result);

    return result;
  }

  manquant(art: Article): boolean {
    return (this.ancientInventaire.articles.includes(art) && !this.nouveauInventaire.articles.includes(art));
  }

  scanné(art: Article): boolean {
    return (this.ancientInventaire.articles.includes(art) && this.nouveauInventaire.articles.includes(art));
  }

  nouveau(art: Article): boolean {
    return (!this.ancientInventaire.articles.includes(art) && this.nouveauInventaire.articles.includes(art));
  }
}

