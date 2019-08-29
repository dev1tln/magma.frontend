import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventaireModule } from './protected/inventaire/inventaires.module';
import { PublicModule } from './public/public.module';
import { UniteModule } from './protected/unite/unite.module';
import { AuthService } from './shared/services/auth.service';
import { CoreModule } from './core/core.module';
import { InventaireService } from './shared/services/inventaires.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    InventaireModule,
    UniteModule,
    PublicModule,
  ],
  providers: [AuthService, InventaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
