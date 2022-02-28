import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PazaakBoardComponent } from './pazaak-board/pazaak-board.component';
import { StartGameDirective } from './start-game.directive';
import { HideCardDirective } from './hide-card.directive';
import { MatchHistoryComponent } from './match-history/match-history.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PazaakBoardComponent,
    StartGameDirective,
    HideCardDirective,
    MatchHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
