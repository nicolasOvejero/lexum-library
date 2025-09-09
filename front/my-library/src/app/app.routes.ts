import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Books } from './books/books';
import { Authors } from './authors/authors';
import {BookDetails} from './book-details/book-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: Books },
  { path: 'books/:id', component: BookDetails },
  { path: 'authors', component: Authors },
];
