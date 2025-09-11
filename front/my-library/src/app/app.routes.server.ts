import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'books/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'authors/:id',
    renderMode: RenderMode.Server,
  },
];
