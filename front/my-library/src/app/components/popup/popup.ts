import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
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
import {bookSchema} from './schemas/add-book-schema';
import {provideNativeDateAdapter} from '@angular/material/core';
import {AuthorsService} from '../../authors/services/authors.service';
import {Author} from '../../authors/author.interface';
import {first} from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {PopupAuthor} from '../popup-author/popup-author';
import {AiService} from '../services/ai.service';
import {Error} from '../../error';

@Component({
  selector: 'app-popup',
  imports: [
    CdkTextareaAutosize,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
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
export class Popup extends Error implements OnInit {
  readonly dialogRef = inject(MatDialogRef<Popup>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);

  authors: Author[] = [];

  isAiLoading: boolean = false;

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    private readonly aiService: AiService,
  ) {
    super();
    this.form = this.fb.group({
      title: [this.data?.title, [Validators.required]],
      authors: [
        this.data?.authors?.map((a: Author) => a.id) || [],
        [Validators.required],
      ],
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

    const result = bookSchema.safeParse(this.form.value);
    if (!result.success) {
      super.setZodErrors(this.form, result.error.issues);
      return;
    }

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
    this.isAiLoading = true;
    this.aiService.getBookDescription(
      this.form.controls['title'].value
    )
      .pipe(
        first(),
      )
      .subscribe((aiResponse: any) => {
        const authors: Author[] = aiResponse.authors?.map((author: any, index: number) => ({
          ...author,
          id: `new-id-${index}`,
        }))
        this.authors.push(...authors);

        this.form.patchValue({
          summary: aiResponse.summary,
          authors: authors.map(({ id }: Author) => id),
        });

        this.isAiLoading = false;
      });

  }
}
