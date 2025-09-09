import {Component, inject, OnInit} from '@angular/core';
import { BooksService } from './services/books.service';
import { Book } from './book.interface';
import { first } from 'rxjs';
import {Author} from '../authors/author.interface';
import {Popup} from '../components/popup/popup';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {bookSchema} from './schemas/add-book-schema';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-books',
  imports: [
    Popup,
    ReactiveFormsModule
  ],
  providers: [
    BooksService,
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class Books implements OnInit {
  books: Book[] = [];
  showPopup: boolean = false;
  form: FormGroup;
  errors: Partial<Record<keyof Book, string>> = {};

  private _snackBar = inject(MatSnackBar);

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      authors: ['', [Validators.required]],
      publishDate: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      nbPages: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.booksService
      .getBooks()
      .pipe(
        first(),
      )
      .subscribe((books: Book[]) => {
        this.books = books;
      });
  }

  mapAuthors(authors: Author[]): String {
    return authors
      .map((author: Author) => `${author.firstname} ${author.lastname}`)
      .join(', ');
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    const result = bookSchema.safeParse(this.form.value);

    if (!result.success) {
      this.setZodErrors(result.error.issues);
      return;
    }

    this.booksService
      .saveBook({
        ...result.data,
        authors: result.data.authors.split(',').map((v) => ({ firstname: v } as Author))
      })
      .pipe(
        first(),
      )
      .subscribe((book: Book) => {
        this.books.push(book);
        this.showPopup = false;
        this._snackBar.open('Book added', undefined, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return null;

    if (control.errors['required']) {
      return 'Ce champ est obligatoire';
    }
    if (control.errors['email']) {
      return 'Format email invalide';
    }
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} caractères`;
    }
    if (control.errors['zod']) {
      return control.errors['zod'];
    }
    return null;
  }

  showBook(bookId: string): void {
    this.router.navigate([`/books/${bookId}`]);
  }

  private setZodErrors(issues: Array<{ path: (string | number)[]; message: string }>) {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setErrors(null);
    });

    for (const issue of issues) {
      const controlName = issue.path[0];
      if (typeof controlName === 'string' && this.form.controls[controlName]) {
        this.form.controls[controlName].setErrors({ zod: issue.message });
      }
    }
  }
}
