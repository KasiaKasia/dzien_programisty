import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { AddTeamComponent } from './add-team/add-team.component';


const routes: Routes = [{
  path: '',
  component: TeamsComponent,
  children: [
    {
      path: 'add-team',
      data: { title: 'Dodaj zespół' },
      component: AddTeamComponent
    } 
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
