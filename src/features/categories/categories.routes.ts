import { Routes } from '@angular/router';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/categories-list.page').then(m => m.CategoriesListPage)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/edit/category-edit.page').then(m => m.CategoryEditPage)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/edit/category-edit.page').then(m => m.CategoryEditPage)
   }

];
