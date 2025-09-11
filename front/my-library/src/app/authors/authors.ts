import {Component, inject, OnInit} from '@angular/core';
import {AuthorsService} from './services/authors.service';
import {first} from 'rxjs';
import {Author, AuthorWithBooks} from './author.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-authors',
  imports: [],
  providers: [
    AuthorsService
  ],
  templateUrl: './authors.html',
  styleUrl: './authors.scss'
})
export class AuthorsComponent implements OnInit {
  authors: [string, Author[]][] = [];

  private _snackBar = inject(MatSnackBar);

  constructor(
    private authorService: AuthorsService,
  ) {}

  ngOnInit() {
    this.authorService
      .getAuthors()
      .pipe(
        first()
      )
      .subscribe({
        next: (authors: Author[]) => {
          this.authors = this.getGroupedAuthors(authors);
        },
        error: (error) => {
          this._snackBar.open('Impossible to retrieve authors', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          console.log(error)
        },
      });
  }

  private getGroupedAuthors(authors: Author[]): [string, Author[]][] {
    if (authors.length === 0) {
      return [];
    }

    const sorted: Author[] = [...authors]
      .sort((a: Author, b: Author) => a.lastname.localeCompare(b.lastname));
    const groups: { [key: string]: Author[] } = {};

    for (const author of sorted) {
      const letter: string = author.lastname[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(author);
    }

    return Object.entries(groups);
  }
}
