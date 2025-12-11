import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
},
{
    path: 'start',
    component: StartComponent
}, {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
},{
    path: 'teams',
    loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule)
}];




