import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton, MatFabButton} from '@angular/material/button';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {bookSchema} from '../../books/schemas/add-book-schema';
import {provideNativeDateAdapter} from '@angular/material/core';
import {AuthorsService} from '../../authors/services/authors.service';
import {Author} from '../../authors/author.interface';
import {first} from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {PopupAuthor} from '../popup-author/popup-author';
import {AiService} from '../services/ai.service';

@Component({
  selector: 'app-popup',
  imports: [
    CdkTextareaAutosize,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatSelectModule,
    MatIconModule,
    MatFabButton,
  ],
  providers: [
    AuthorsService,
    AiService,
    provideNativeDateAdapter(),
  ],
  templateUrl: './popup.html',
  styleUrl: './popup.scss'
})
export class Popup implements OnInit {
  readonly dialogRef = inject(MatDialogRef<Popup>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);

  authors: Author[] = [];

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    private readonly aiService: AiService,
  ) {
    this.form = this.fb.group({
      title: [this.data?.title, [Validators.required]],
      authors: [this.data?.authors.map(({ id }: { id: string }) => id) || [], [Validators.required]],
      publishDate: [this.data?.publishDate, [Validators.required]],
      summary: [this.data?.summary, [Validators.required]],
      nbPages: [this.data?.nbPages, [Validators.required]],
    });
  }

  ngOnInit() {
    this.authorsService.getAuthors()
      .pipe(
        first(),
      )
      .subscribe((authors: Author[]) => this.authors = authors);
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    /* TODO
        const result = bookSchema.safeParse(this.form.value);
        if (!result.success) {
          this.setZodErrors(result.error.issues);
          return;
        }
    */
    this.dialogRef.close({
      ...this.form.value,
      authors: this.form.value
        .authors
        .map((authorsId: string) =>
          this.authors.find(({ id }) => authorsId === id)
        ),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAuthor(): void {
    const dialogRef = this.dialog.open(PopupAuthor);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authors.push({
          id: `new-id-${Date.now()}`,
          ...result,
        });
      }
      console.log('The dialog was closed', result);
    });
  }

  findInformationOnBook(): void {
    this.aiService.getBookDescription(
      this.form.controls['title'].value
    )
      .pipe(
        first(),
      )
      .subscribe((description: any) => {
        this.form.controls['title'].setValue(description.title)
        this.form.controls['summary'].setValue(description.summary)
        this.form.controls['publishDate'].setValue(description.publicationDate)
        this.form.controls['nbPages'].setValue(description.numberOfPages)
        this.form.controls['authors'].setValue(description.authors)
      });

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
