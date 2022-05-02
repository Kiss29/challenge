import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveCalculatorComponent } from 'src/app/reactive-calculator/reactive-calculator.component';

const routes: Routes = [
  { path: '', component: ReactiveCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
