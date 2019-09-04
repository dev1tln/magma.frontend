import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Inventaire, Article } from 'src/app/shared/models/model';
import { InventaireService } from 'src/app/shared/services/inventaires.service';
import { DescriptionArticleService } from '../../pages/descriptionArticle/descriptionArticle.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {
  ancientInventaire: Inventaire;
  nouveauInventaire: Inventaire;

  affichageData: Map<string, Article[]>;

  constructor(
    private inventaireService: InventaireService,
    private description_article: DescriptionArticleService
  ) { }

  ngOnInit(): void {
    if (this.inventaireService.exist()) {
      this.ancientInventaire = this.inventaireService.getAncientInventaire();
      this.nouveauInventaire = this.inventaireService.getNouveauInventaire();

      this.affichageData = this.groupArticlesByNno();
    }
  }

  // Regroupe les articles par leur nno
  groupArticlesByNno() {
    let result = this.ancientInventaire.articles.reduce((groups, article) => {
      const nno = article.nno;
      const array = groups.get(nno) || [];
      array.push(article);
      groups.set(nno, array);
      return groups;
    }, new Map<string, Article[]>());

    // On regroupe les ancient avec les nouveaux articles
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


  compteManquant(tab: Article[]): number {
    let cpt = 0;
    tab.forEach(article => {
      if (this.manquant(article)) { cpt++; }
    });
    return cpt;
  }

  compteNouveau(tab: Article[]): number {
    let cpt = 0;
    tab.forEach(article => {
      if (this.nouveau(article)) { cpt++; }
    });
    return cpt;
  }

  manquant(art: Article): boolean {
    return (this.ancientInventaire.articles.includes(art) && !this.nouveauInventaire.articles.includes(art));
  }

  scanne(art: Article): boolean {
    return (this.ancientInventaire.articles.includes(art) && this.nouveauInventaire.articles.includes(art));
  }

  nouveau(art: Article): boolean {
    return (!this.ancientInventaire.articles.includes(art) && this.nouveauInventaire.articles.includes(art));
  }

  onSubmit(article: Article) {
    this.description_article.setArticle(article);
  }
}

