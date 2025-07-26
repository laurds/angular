import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-task-form/add-task-form.component').then(m => m.AddTaskFormComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
