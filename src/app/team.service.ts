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

  private LS_KEY = 'quiz_teams';

  teams = signal<Team[]>(this.loadFromLocalStorage());

  constructor() {}
 
  private loadFromLocalStorage(): Team[] {
    const data = localStorage.getItem(this.LS_KEY);
    return data ? JSON.parse(data) : [];
  }
 
  private saveToLocalStorage() {
    localStorage.setItem(this.LS_KEY, JSON.stringify(this.teams()));
  }
 
  addTeam(name: string) {
    const newTeam: Team = {
      id: this.teams().length + 1,
      name,
      points: 0
    };

    this.teams.set([...this.teams(), newTeam]);
    this.saveToLocalStorage();
  }
 
  removeTeam(id: number) {
    const updated = this.teams().filter(t => t.id !== id);
    this.teams.set(updated);
    this.saveToLocalStorage();
  }
 
  updateTeamName(id: number, newName: string) {
    const updated = this.teams().map(t =>
      t.id === id ? { ...t, name: newName } : t
    );
    this.teams.set(updated);
    this.saveToLocalStorage();
  }
 
  updatePoints(id: number, newPoints: number) {
    const updated = this.teams().map(t =>
      t.id === id ? { ...t, points: newPoints } : t
    );
    this.teams.set(updated);
    this.saveToLocalStorage();
  }
 
  addPoint(teamName: string) {
    const updated = this.teams().map(t =>
      t.name === teamName ? { ...t, points: t.points + 1 } : t
    );
    this.teams.set(updated);
    this.saveToLocalStorage();
  }
}
