import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageInventaireComponent } from './inventaire/pages/inventaire/inventaire.page';
import { PageAuthComponent } from './core/pages/auth/auth.page';
import { MenuInventaireComponent } from './inventaire/components/menu/menubar.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: PageAuthComponent },
  {
    path: 'inventaire', component: MenuInventaireComponent, children: [
      { path: '', component: PageInventaireComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
