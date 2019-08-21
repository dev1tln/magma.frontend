import { NgModule } from '@angular/core';
import { PageChoixUniteComponent } from './pages/choixUnite/choixUnite.page';
import { CoreModule } from 'src/app/core/core.module';
import { LayerModule } from 'src/app/layout/layout.module';
import { HomeUniteComponent } from './pages/homeUnite/homeUnite.page';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChoixUniteComponent } from './components/choixUnite/choixUnite.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageChoixUniteComponent, HomeUniteComponent, ChoixUniteComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    LayerModule,
    MaterialModule,
  ]
})
export class UniteModule { }
