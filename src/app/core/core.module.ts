import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageAuthComponent } from './auth/auth.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PageAuthComponent],
  exports: [PageAuthComponent]
})
export class CoreModule { }
