import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedGameListComponent } from '../../Components/saved-game-list/saved-game-list.component';

const routes: Routes = [
  {
    path: '',
    component: SavedGameListComponent,
    title: 'saved-games'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedGameRoutingModule { }
