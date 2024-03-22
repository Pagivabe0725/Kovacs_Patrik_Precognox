import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedGameRoutingModule } from './saved-game-routing.module';
import { GameComponent } from '../../Components/game/game.component';
import { BoardComponent } from '../../Components/board/board.component';
import { OptionsComponent } from '../../Components/options/options.component';
import { GameMessageComponent } from '../../Components/game-message/game-message.component';
import { SavedGameListComponent } from '../../Components/saved-game-list/saved-game-list.component';
import { SavedMessageComponent } from '../../Components/saved-message/saved-message.component';


@NgModule({
  declarations: [
    SavedGameListComponent,
    SavedMessageComponent,
  ],
  imports: [
    CommonModule,
    SavedGameRoutingModule,
  ]
})
export class SavedGameModule { }
