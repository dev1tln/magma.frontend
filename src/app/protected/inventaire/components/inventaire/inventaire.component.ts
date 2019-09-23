
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Inventaire, Article } from 'src/app/shared/models/model';
import { InventaireService } from 'src/app/shared/services/inventaires.service';
import { INVENTAIRE_ANCIENT, INVENTAIRE_NOUVEAU } from 'src/app/shared/graphql/queries';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { DescriptionArticleService } from 'src/app/shared/services/descriptionArticle.service';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {
  affichageData: Map<string, Article[]>;
  constructor(
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService,
    private inventaireService: InventaireService,
    private articleService: DescriptionArticleService
  ) { }

  ngOnInit(): void {

    if (!this.authService.isAuth()) {
      this.router.navigateByUrl('/auth');
      return;
    }

    if (this.inventaireService.getDetention() === null) {
      this.router.navigateByUrl('/unite/choix');
      return;
    }

    this.apollo.watchQuery<any>({
      query: INVENTAIRE_ANCIENT,
      variables: {
        detention: this.inventaireService.getDetention(),
      }
    }).valueChanges.subscribe(ancient => {

      this.inventaireService.ancientInventaire = ancient.data.inventaires[0];

      this.apollo.watchQuery<any>({
        query: INVENTAIRE_NOUVEAU,
        variables: {
          detention: this.inventaireService.getDetention(),
        }
      }).valueChanges.subscribe(nouveau => {
        // init les variables
        this.inventaireService.nouveauInventaire = nouveau.data.inventaires[0];
        this.affichageData = this.groupArticlesByNno();
      });
    });
  }

  // Regroupe les articles par leurs nno
  groupArticlesByNno() {
    let result = this.inventaireService.ancientInventaire.articles.reduce((groups, article) => {
      const nno = article.nno;
      const array = groups.get(nno) || [];
      array.push(article);
      groups.set(nno, array);
      return groups;
    }, new Map<string, Article[]>());

    // On regroupe les ancient avec les nouveaux articles
    result = this.inventaireService.nouveauInventaire.articles.reduce((groups, article) => {
      const nno = article.nno;
      const array = groups.get(nno) || [];
      if (!array.some(item => item.article_id === article.article_id)) { array.push(article); }
      groups.set(nno, array);
      return groups;
    }, result);

    console.log(result);

    return result;
  }



  // Méthodes pour l'affichage
  
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
    return (
      this.inventaireService.ancientInventaire.articles.some(item => item.article_id === art.article_id)
      && !this.inventaireService.nouveauInventaire.articles.some(item => item.article_id === art.article_id)
    );
  }

  scanne(art: Article): boolean {
    return (this.inventaireService.ancientInventaire.articles.some(item => item.article_id === art.article_id)
      && this.inventaireService.nouveauInventaire.articles.some(item => item.article_id === art.article_id)
    );
  }

  nouveau(art: Article): boolean {
    return (!this.inventaireService.ancientInventaire.articles.some(item => item.article_id === art.article_id)
      && this.inventaireService.nouveauInventaire.articles.some(item => item.article_id === art.article_id)
    );
  }

  onSubmit(article: Article) {
    this.articleService.setArticle(article);
  }
}

