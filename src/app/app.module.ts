import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';

import { GameComponent } from './game/game.component';
import { ConstructionComponent } from './construction/construction.component';
import { ShipComponent } from './ship/ship.component';
import { ConstructionRequestObserverComponent } from './construction-request-observer/construction-request-observer.component';
import { ShipRequestObserverComponent } from './ship-request-observer/ship-request-observer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ConstructionComponent,
    ShipComponent,
    ConstructionRequestObserverComponent,
    ShipRequestObserverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({ // <--- add this code piece
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ButtonsModule, TabsModule, ModalModule, TooltipModule, CollapseModule]
})
export class AppModule { }
