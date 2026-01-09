import { Routes } from '@angular/router';
import { DevtospanishComponent } from './devtospanish/pages/devtospanish/devtospanish';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./devtospanish/pages/devtospanish/devtospanish').then(m => m.DevtospanishComponent),
    title: 'Devtospanish',
  },
  {
    path: 'about',
    loadComponent: () => import('./devtospanish/pages/about/about').then(m => m.AboutComponent),
    title: 'Acerca de - Devtospanish',
  },
];
