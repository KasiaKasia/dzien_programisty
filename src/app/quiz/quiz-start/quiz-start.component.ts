import { Component, signal } from '@angular/core';
import { TeamService } from '../../team.service';
import { CommonModule } from '@angular/common';

interface Zadanie {
  numer: string;
  pytanie: string;
  odpowiedzi: string[];
  poprawna: string;
}

@Component({
  selector: 'app-quiz-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-start.component.html',
  styleUrl: './quiz-start.component.scss'
})
export class QuizStartComponent {

  zadania = signal<Zadanie[]>([
    { numer: 'Zadanie 1', pytanie: 'pytanie?', odpowiedzi: ['odpowiedzi 1', 'odpowiedzi 2', 'odpowiedzi 3'], poprawna: 'odpowiedzi 3' },
 
]);

  wybraneZadanie = signal<Zadanie | null>(null);

  wybierzZadanie(event: Event) {
    const select = event.target as HTMLSelectElement;
    const numer = select.value;
    const zad = this.zadania().find(z => z.numer === numer) || null;
    this.wybraneZadanie.set(zad);

    this.clickedAnswer = null;
    this.blokadaKlikania.set(false);
  }

  selectedTeam: string = '';

  constructor(public teamService: TeamService) { }


  teams() {
    return this.teamService.teams();
  }

  wybierzZespol(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedTeam = select.value;
    console.log('Wybrany zespół:', this.selectedTeam);
  }

  clickedAnswer: string | null = null;
  wykonywaneZadania = signal<Set<string>>(new Set());
  blokadaKlikania = signal(false);

sprawdzOdpowiedz(odp: string) {
  if (!this.selectedTeam || this.blokadaKlikania()) return;

  this.clickedAnswer = odp;

  if (odp === this.wybraneZadanie()?.poprawna) {
    this.teamService.addPoint(this.selectedTeam);
  }

  this.blokadaKlikania.set(true);

  if (this.wybraneZadanie()) {
    const kopia = new Set(this.wykonywaneZadania());
    kopia.add(this.wybraneZadanie()!.numer);
    this.wykonywaneZadania.set(kopia);
  }

  const select = document.querySelector('#select-zadanie') as HTMLSelectElement;
  if (select) select.value = "";
}



  getAnswerClass(odp: string) {
    if (!this.clickedAnswer) return {};

    return {
      correct: odp === this.wybraneZadanie()?.poprawna,
      wrong: odp !== this.wybraneZadanie()?.poprawna && odp === this.clickedAnswer
    };
  }


}
