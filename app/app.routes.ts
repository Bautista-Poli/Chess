import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

export const routes: Routes = [ 
    { path: 'Game',
    component: GameComponent
    },{
        path: '',
        redirectTo: 'Game',
        pathMatch: 'full'
    }
];
