import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiLabel, TuiLink,
  TuiRoot,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTitle
} from "@taiga-ui/core";
import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiInputSliderModule,
  TuiSelectModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/legacy';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiFieldErrorPipe,
  TuiPassword,
} from '@taiga-ui/kit';
import {AsyncPipe, NgIf} from '@angular/common';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {YandexSmartCaptchaComponent} from './yandex-smart-captcha.component';

@Component({
  imports: [TuiRoot, TuiButton, TuiInputModule, TuiError, TuiIcon, TuiTextfieldComponent, ReactiveFormsModule, TuiInputDateModule, TuiFieldErrorPipe, AsyncPipe, TuiInputSliderModule, TuiSelectModule, TuiInputPhoneModule, TuiLabel, TuiForm, TuiHeader, TuiTitle, TuiTextfieldDirective, TuiPassword, TuiTextfieldControllerModule, FormsModule, TuiAppearance, TuiCardLarge, HttpClientModule, RouterLink, TuiLink, NgIf, YandexSmartCaptchaComponent],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class RegisterComponent {
  protected readonly form = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', [Validators.min(8), Validators.required]),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  get username() { return this.form.get('username'); }
  capt = false
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
  }
  exists = ""
  onSubmit() {
    if (this.form.valid) {
      const signUpData = {
        firstName: this.form.value.name,
        lastName: this.form.value.lastName,
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.authService.signUp(signUpData).subscribe(
        response => {
          const token = response.token; // Adjust this according to your API response structure
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (1000 * 60 * 60 * 23.5)); // Set expiration to 24 hours
          this.cookieService.set('authToken', token, expirationDate);
          this.router.navigate(['/']);
        },
        error => {
          this.exists = "Profile with this username or email is already exists! \nor smth went wrong"
          console.error('Registration failed', error);
        }
      );
    }
  }

  protected readonly parent = parent;
}
