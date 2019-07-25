import { NgModule } from '@angular/core';
import { PageChoixUniteComponent } from './pages/choixUnite/choixUnite.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [PageChoixUniteComponent],
  imports: [
    CoreModule
  ]
})
export class UniteModule { }
