import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { PazaakBoardComponent } from './pazaak-board/pazaak-board.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent
  },
  {
    path: 'pazaak',
    component: PazaakBoardComponent
  },
  {
    path: 'match-history',
    component: MatchHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
