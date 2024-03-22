import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from '../../Components/game/game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    title: 'game',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
