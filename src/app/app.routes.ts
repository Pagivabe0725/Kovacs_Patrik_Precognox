import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'game',
        loadChildren: () => import('../app/Modules/game/game.module').then(m => m.GameModule),
    },
    {
        path: 'saved-games',
        loadChildren: () => import('../app/Modules/saved-game/saved-game.module').then(m => m.SavedGameModule),
    },
    {
        path: '',
        loadChildren: () => import('../app/Modules/game/game.module').then(m => m.GameModule),
    },
    {
        path: '**',
        redirectTo: 'game'
    }

];
