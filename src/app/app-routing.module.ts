import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeInventaireComponent } from './modules/inventaire/pages/homeInventaire/homeInventaire.page';
import { PageAuthComponent } from './core/auth/auth.page';
import { MenuInventaireComponent } from './modules/inventaire/components/menuInventaire/menuInventaire.component';
import { PageChoixUniteComponent } from './modules/unite/pages/choixUnite/choixUnite.page';
import { HomeUniteComponent } from './modules/unite/pages/homeUnite/homeUnite.page';

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
      { path: '', component: HomeInventaireComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
