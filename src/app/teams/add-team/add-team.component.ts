import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../team.service';


export interface Team {
  id: number;
  name: string;
  points: number;
}

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss'
})
export class AddTeamComponent {


  newTeamName = '';
  editingTeamId: number | null = null;
  editedTeamName: string = '';
  editedTeamPoints: number = 0;
  constructor(private teamService: TeamService) { }

  addTeam() {
    if (this.newTeamName.trim()) {
      this.teamService.addTeam(this.newTeamName);
      this.newTeamName = '';
    }
  }


  teams() {
    return this.teamService.teams();
  }

  removeTeam(id: number) {
    this.teamService.removeTeam(id);
  }

  startEdit(id: number, name: string, points: number) {
    this.editingTeamId = id;
    this.editedTeamName = name;
    this.editedTeamPoints = points;
  }
  saveEdit(id: number) {
    this.teamService.updateTeamName(id, this.editedTeamName);
    this.teamService.updatePoints(id, this.editedTeamPoints);
    this.editingTeamId = null;
  }

  cancelEdit() {
    this.editingTeamId = null;
  }
}