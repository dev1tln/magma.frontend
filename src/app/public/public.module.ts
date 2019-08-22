import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageAuthComponent } from './auth/auth.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PageAuthComponent],
  exports: [PageAuthComponent, MaterialModule, CommonModule]
})
export class PublicModule { }
