import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedFormData =  window.localStorage.getItem('login-form-data');
      if (savedFormData) {
        const loadedData = JSON.parse(savedFormData);
        const savedEmail = loadedData.email;
        if (savedEmail) {
          setTimeout(() => {
            this.form().controls['email'].setValue(savedEmail);
          }, 1);
        }
      }

      const subscription = this.form().valueChanges?.pipe(
       debounceTime(500) // Debounce the value changes to avoid excessive updates
      ).subscribe({
        next:(value) => {
          window.localStorage.setItem('login-form-data', JSON.stringify({ email: value.email }));
        }
      });
      
      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });

    });

    
  }

  onSubmit(formData: NgForm) {
    if(formData.form.invalid) {
      console.log('Form Data:', formData.form);
      return}
    const enteredEmail = formData.value.email;
    const enteredPassword = formData.value.password;

    console.log('Email:', enteredEmail);
    console.log('Password:', enteredPassword);

    formData.form.reset();
  }
}
