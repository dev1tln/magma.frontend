import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeInventaireComponent } from './protected/inventaire/pages/homeInventaire/homeInventaire.page';
import { PageAuthComponent } from './public/auth/auth.page';
import { MenuInventaireComponent } from './protected/inventaire/components/menuInventaire/menuInventaire.component';
import { PageChoixUniteComponent } from './protected/unite/pages/choixUnite/choixUnite.page';
import { HomeUniteComponent } from './protected/unite/pages/homeUnite/homeUnite.page';
import { DescriptionArticleComponent } from './protected/inventaire/pages/descriptionArticle/descriptionArticle.page';
import { ScannerPageComponent } from './protected/inventaire/pages/scannerPage/scannerPage.page';



const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: PageAuthComponent },
  {
    path: 'unite', component: HomeUniteComponent, children: [
      { path: 'choix', component: PageChoixUniteComponent }
    ]
  },
  {
    path: 'inventaire', component: MenuInventaireComponent, children: [
      { path: '', component: HomeInventaireComponent },
      { path: 'article', component: DescriptionArticleComponent }
    ]
  },
  {
    path: 'inventaire', component: MenuInventaireComponent, children: [
      { path: '', component: HomeInventaireComponent },
      { path: 'scanner', component: ScannerPageComponent }
    ]
  }
  ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
