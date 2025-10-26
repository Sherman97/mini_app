import { Routes } from '@angular/router';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/tasks-list.page').then(m => m.TasksListPage)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/edit/task-edit.page').then(m => m.TaskEditPage)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/edit/task-edit.page').then(m => m.TaskEditPage)
  }
];
