import { Component } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  teams = this.teamService.teams;

  constructor(private teamService: TeamService) {}
}
