import { Injectable, signal } from '@angular/core';
export interface Team {
  id: number;
  name: string;
  points: number;
}
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private _teams = signal<Team[]>([]);

  readonly teams = this._teams.asReadonly();

  addTeam(name: string) {
    const newTeam: Team = {
      id: this._teams().length + 1,
      name,
      points: 0
    };
    this._teams.set([...this._teams(), newTeam]);
  }

  updatePoints(id: number, points: number) {
    this._teams.set(this._teams().map(t => t.id === id ? { ...t, points } : t));
  }

  updateTeamName(id: number, name: string) {
    this._teams.set(this._teams().map(t => t.id === id ? { ...t, name } : t));
  }

  removeTeam(id: number) {
    this._teams.set(this._teams().filter(t => t.id !== id));
  }
  addPoint(teamName: string) {
    this._teams.set(this._teams().map(t =>
      t.name === teamName ? { ...t, points: t.points + 1 } : t
    ));
  }

}
