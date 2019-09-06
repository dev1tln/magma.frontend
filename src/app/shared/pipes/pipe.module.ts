import { NgModule } from '@angular/core';
import { SecurePipe } from './secure.pipe';

@NgModule({
  declarations: [SecurePipe],
  exports: [SecurePipe]
})
export class PipeModule {
}
