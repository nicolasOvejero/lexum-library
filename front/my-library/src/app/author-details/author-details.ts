import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthorsService} from '../authors/services/authors.service';
import {ActivatedRoute} from '@angular/router';
import {first, switchMap} from 'rxjs';
import {AuthorWithBooks} from '../authors/author.interface';
import {BookCard} from '../components/book-card/book-card';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-author-details',
  imports: [
    BookCard,
  ],
  providers: [
    AuthorsService,
  ],
  templateUrl: './author-details.html',
  styleUrl: './author-details.scss',
  encapsulation: ViewEncapsulation.None
})
export class AuthorDetails implements OnInit {
  author: AuthorWithBooks | null = null;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private authorService: AuthorsService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params =>
          this.authorService.getAuthorWithBook(params.get('id')!)
        ),
        first(),
      )
      .subscribe({
        next: (authorWithBooks: AuthorWithBooks) => {
          this.author = authorWithBooks;
        },
        error: (error) => {
          this._snackBar.open('Impossible to retrieve authors information', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          console.log(error)
        },
      });
  }
}
