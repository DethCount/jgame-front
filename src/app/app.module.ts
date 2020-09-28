import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core'

import { GameComponent } from './game/game.component'
import { ConstructionComponent } from './construction/construction.component'
import { ShipComponent } from './ship/ship.component'
import { ConstructionRequestObserverComponent } from './construction-request-observer/construction-request-observer.component'
import { ShipRequestObserverComponent } from './ship-request-observer/ship-request-observer.component'
import { AdministrableLocationComponent } from './administrable-location/administrable-location.component';
import { AdministrableLocationBtnComponent } from './administrable-location-btn/administrable-location-btn.component';
import { ResearchComponent } from './research/research.component';
import { ResearchRequestObserverComponent } from './research-request-observer/research-request-observer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json")
}

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ConstructionComponent,
    ShipComponent,
    ConstructionRequestObserverComponent,
    ShipRequestObserverComponent,
    AdministrableLocationComponent,
    AdministrableLocationBtnComponent,
    ResearchComponent,
    ResearchRequestObserverComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
