
import { Component, ViewChild,OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Inventaire, Article } from 'src/app/shared/models/model';
import { InventaireService } from 'src/app/shared/services/inventaires.service';
import { INVENTAIRE_ANCIENT, INVENTAIRE_NOUVEAU } from 'src/app/shared/graphql/queries';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { DescriptionArticleService } from 'src/app/shared/services/descriptionArticle.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Pipe, PipeTransform} from '@angular/core';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-restitution',
  templateUrl: './restitution.component.html',
  styleUrls: ['./restitution.component.scss']
})
export class RestitutionComponent implements OnInit { 
  @ViewChild('accordion',{static:true}) Accordion: MatAccordion;
  affichageData: Map<string, Article[]>;private titre: string = 'Restitutions';
  
  constructor(
    
    private apollo: Apollo,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private inventaireService: InventaireService,
    private articleService: DescriptionArticleService
  ) { }

  
  generatePdf(action = 'open') {
   
    function buildTableBody(data, columns) {
      var body = [];
  
      body.push(columns);
  
      data.forEach(function(row) {
          var dataRow = [];
  
          columns.forEach(function(column) {
              dataRow.push(row[column].toString());
          })
  
          body.push(dataRow);
      });
  
      return body;
    }
    function table(data,columns) {
      return {
          table: {
              headerRows: 1,
              body: buildTableBody(data, columns)
          }
      };
  }

      let docDefinition = {      
      header: 'Restitution Exemple 1',      
      content:[
        { text: "Gisement:"+this.detention(), style: 'header' },
       // table(externalDataRetrievedFromServer, ['name',])
       table(this.inventaireService.ancientInventaire.articles, ['nno','lib',])
    ]
    
    };    
    switch (action) {
      case 'open': pdfMake.createPdf(docDefinition).open(); break;
      case 'print': pdfMake.createPdf(docDefinition).print(); break;
      case 'download': pdfMake.createPdf(docDefinition).download(); break;
      default: pdfMake.createPdf(docDefinition).open(); break;
    }
  }

 
  closeAllPanels(){
    this.Accordion.closeAll();
  }

  openAllPanels(){    
      this.Accordion.openAll();
      
   }  

  ngOnInit(): void {

    if (!this.authService.isAuth()) {
      this.router.navigateByUrl('/auth');
      return;
    }

    if (this.inventaireService.getDetention() === null) {
      this.router.navigateByUrl('/unite/choix');
      return;
    }

    this.apollo.query<any>({
      query: INVENTAIRE_ANCIENT,
      variables: {
        detention: this.inventaireService.getDetention(),
      }
    }).subscribe(ancient => {

      this.inventaireService.ancientInventaire = ancient.data.inventaires[0];

      this.apollo.query<any>({
        query: INVENTAIRE_NOUVEAU,
        variables: {
          detention: this.inventaireService.getDetention(),
        }
      }).subscribe(nouveau => {
        // init les variables
        this.inventaireService.nouveauInventaire = nouveau.data.inventaires[0];

        // Si aucun inventaire est en cours
        if (this.inventaireService.ancientInventaire.id === this.inventaireService.nouveauInventaire.id) {
          const myDialog = this.dialog.open(DialogInventaireComponent, {
            width: '250px'
          });

          myDialog.afterClosed().subscribe(result => {
            if (this.inventaireService.ancientInventaire.id !== this.inventaireService.nouveauInventaire.id) {

              this.affichageData = this.groupArticlesByNno();
            }
          });
        } else {
          this.affichageData = this.groupArticlesByNno();
        }
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

    // On regroupe les anciens avec les nouveaux articles
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
  detention(){
    return(
      this.inventaireService.getLibelleDetention()
    ) ;
      
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

@Component({
  selector: 'app-new-inventaire',
  templateUrl: '../inventaire/newInventaire/dialog.component.html',
})
export class DialogInventaireComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogInventaireComponent>,
    private inventaireService: InventaireService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  newInventaire(): void {
    this.inventaireService.nouvelInventaire();
    this.dialogRef.close();
  }
}
