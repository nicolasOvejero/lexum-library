import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatInput, MatLabel} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {authorSchema} from './schemas/add-author-schema';
import {Error} from '../../error';

@Component({
  selector: 'app-popup-author',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    FormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatButton,
    MatDialogActions,
    MatError,
  ],
  templateUrl: './popup-author.html',
  styleUrl: './popup-author.scss'
})
export class PopupAuthor extends Error {
  readonly dialogRef = inject(MatDialogRef<PopupAuthor>);

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) {
    super();
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    const result = authorSchema.safeParse(this.form.value);
    if (!result.success) {
      super.setZodErrors(this.form, result.error.issues);
      return;
    }

    this.dialogRef.close({
      ...this.form.value,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
