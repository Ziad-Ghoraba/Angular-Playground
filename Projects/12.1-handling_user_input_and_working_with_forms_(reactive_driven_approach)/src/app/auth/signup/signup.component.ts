import { debounceTime, of } from 'rxjs';
import { Component } from '@angular/core';
import { AbstractControl, FormControl,ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';



function mustContainQuestionMark(control: AbstractControl) {
  if(control.value && control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if(control.value === 'user@example.com') {
    return of({notUnique: true});
  }
  return of(null);
}

function equalValues(constrolName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(constrolName1);
    const value2 = control.get(controlName2);
    
    if(value1 !== value2) {
      return { notEqual: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})

export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: [emailIsUnique],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required],
      }),
    },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
    name: new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.required],
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^\d{5}$/)],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  get emailIsInvalid() {
    return this.form.controls.email.invalid && this.form.controls.email.touched;
  }

  get passwordIsInvalid() {
    return this.form.controls.passwords.controls.password.invalid && this.form.controls.passwords.controls.password.touched;
  }


  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }
    console.log(this.form.value);
    this.form.reset();
  }
}
