import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    {
      path: 'tasks',
      loadChildren: () => import('../features/tasks/tasks.routes')
      .then(m => m.TASKS_ROUTES)
    },
    {
      path: 'categories',
      loadChildren: () => import('../features/categories/categories.routes')
      .then(m => m.CATEGORIES_ROUTES)
    },
    {
      path: 'settings',
      loadChildren: () => import('../features/settings/settings.routes')
      .then(m => m.SETTINGS_ROUTES)
    },
    { path: '**', redirectTo: 'tasks' }
];
