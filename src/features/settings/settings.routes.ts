import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/remote-config-demo/remote-config-demo.page')
        .then(m => m.RemoteConfigDemoPage)
  }
];
