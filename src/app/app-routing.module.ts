import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TaskDetailsComponent, TasksComponent} from './pages';

const routes: Routes = [
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full'
  },
  {
    path: 'tasks', component: TasksComponent
  },
  {
    path: 'tasks/:id', component: TaskDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
