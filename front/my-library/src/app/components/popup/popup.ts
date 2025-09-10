import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {bookSchema} from '../../books/schemas/add-book-schema';
import {provideNativeDateAdapter} from '@angular/material/core';

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
    MatDialogContent
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './popup.html',
  styleUrl: './popup.scss'
})
export class Popup {
  readonly dialogRef = inject(MatDialogRef<Popup>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      title: [this.data.title, [Validators.required]],
      authors: [this.data.authors, [Validators.required]],
      publishDate: [this.data.publishDate, [Validators.required]],
      summary: [this.data.summary, [Validators.required]],
      nbPages: [this.data.nbPages, [Validators.required]],
    });
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

    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
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
