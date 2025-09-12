import {FormGroup} from '@angular/forms';

export abstract class Error {
  setZodErrors(
    form: FormGroup,
    issues: Array<{ path: (string | number)[]; message: string }>
  ) {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].setErrors(null);
    });

    for (const issue of issues) {
      const controlName = issue.path[0];
      if (typeof controlName === 'string' && form.controls[controlName]) {
        form.controls[controlName].setErrors({ zod: issue.message });
      }
    }
  }
}
