import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, LogoComponent],
  templateUrl: './user-forms.component.html',
  styleUrl: './user-forms.component.css',
})
export class UserFormsComponent {
  constructor(private readonly http: HttpClient) {}
  //<---- Guest Account
  guestAccountPlaceholder = 'Pick a username :)';
  guestAccountForm = new FormControl('', {
    validators: [
      Validators.required,
      Validators.min(3),
      Validators.max(10),
      Validators.email,
    ],
  });
  handleGuestAccountSign = (): Observable<string> => {
    // will handle the sign in form for guest account
    return this.http.get<string>('http://port');
  };
  //----> Guest Account
  //<---- Account Signup
  signUpForm = new FormGroup({
    email: new FormControl('', {
      validators: Validators.required,
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(8),
        Validators.pattern(
          '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/',
        ),
      ],
    }),
  });
  // Custom validator function
  handleSignUp() {
    alert(this.signUpForm.value.email);
  }
  //----> Account Signup
}
