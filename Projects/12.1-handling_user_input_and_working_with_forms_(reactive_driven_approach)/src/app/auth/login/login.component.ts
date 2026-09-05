import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


function mustContainQuestionMark(control: AbstractControl) {
  if(control.value && control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if(control.value === 'test@example.com') {
    return of({notUnique: true});
  }
  return of(null);
}

let initialEmailValue = '';
const savedEmail = window.localStorage.getItem('saved-email');

if(savedEmail)
  initialEmailValue = JSON.parse(savedEmail).email;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(initialEmailValue, { //Array of validators can be added here, or configuration object can be used instead of an array
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }), 
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    })
  });

  get emailIsInvalid() {
    return this.form.controls.email.invalid && this.form.controls.email.touched;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.invalid && this.form.controls.password.touched;
  }

  onSubmit() {
    console.log(this.form.value.email);
    console.log(this.form.value.password);
    this.form.reset();
  }

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    // const savedEmail = window.localStorage.getItem('saved-email');
    // if(savedEmail) {
    //   this.form.patchValue({
    //     email: JSON.parse(savedEmail).email
    //   });
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
      window.localStorage.setItem('saved-email', JSON.stringify({email: value.email}));
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    
  }

}
