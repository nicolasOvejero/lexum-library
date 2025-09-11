import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'books',
    loadComponent: () => import('./books/books').then(m => m.Books),
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./book-details/book-details').then(m => m.BookDetails),
    data: {
      renderMode: 'server',
    },
  },
  {
    path: 'authors',
    loadComponent: () => import('./authors/authors').then(m => m.AuthorsComponent),
  },
  {
    path: 'authors/:id',
    loadComponent: () => import('./author-details/author-details').then(m => m.AuthorDetails),
    data: {
      renderMode: 'server',
    },
  },
];
