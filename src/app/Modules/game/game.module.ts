import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from '../../Components/game/game.component';
import { BoardComponent } from '../../Components/board/board.component';
import { OptionsComponent } from '../../Components/options/options.component';
import { GameMessageComponent } from '../../Components/game-message/game-message.component';
import { BoardService } from '../../Services/board.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    OptionsComponent,
    GameMessageComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[
    BoardService,
  ]
})
export class GameModule { }
