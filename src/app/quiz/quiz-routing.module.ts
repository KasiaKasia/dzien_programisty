import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { QuizStartComponent } from './quiz-start/quiz-start.component';


const routes: Routes = [{
  path: '',
  component: QuizComponent,
  children: [
    {
      path: 'quiz-start',
      data: { title: 'start' },
      component: QuizStartComponent
    } 
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
