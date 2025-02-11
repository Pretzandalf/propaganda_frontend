import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  TuiRoot,
  TuiButton,
  TuiTextfieldComponent,
  TuiError,
  TuiIcon,
  TuiLabel,
  TuiTextfieldDirective,
  TuiLink, TuiTitle, TuiAppearance
} from "@taiga-ui/core";
import {AuthService} from './auth.service';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import {TuiCardLarge, TuiForm, TuiHeader} from '@taiga-ui/layout';
import {TuiFieldErrorPipe, TuiPassword} from '@taiga-ui/kit';
import {AsyncPipe, NgIf} from "@angular/common";
import {TuiInputModule} from '@taiga-ui/legacy';
import {fromEvent, takeUntil} from "rxjs";
import {YandexSmartCaptchaComponent} from "./yandex-smart-captcha.component";
import {TuiSheetDialog} from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiRoot,
    TuiButton,
    TuiTextfieldComponent,
    TuiError,
    TuiIcon,
    TuiLabel,
    TuiInputModule,
    HttpClientModule,
    TuiCardLarge,
    TuiForm,
    TuiHeader,
    TuiTitle,
    TuiTextfieldDirective,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiLink,
    RouterLink,
    TuiPassword,
    TuiAppearance,
    NgIf,
    YandexSmartCaptchaComponent,
    TuiSheetDialog
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./app.component.css']
})
export class LoginComponent {
  @ViewChild('usernameInput', {static: false}) usernameInput: ElementRef | undefined;
  @ViewChild('passwordInput', {static: false}) passwordInput: ElementRef | undefined;
  protected readonly form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  capt = false;
  protected loginFailed = false;
  private destroy$;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.destroy$ = fromEvent(document, 'click').pipe(takeUntil(this.authService.validate()));
    this.destroy$.subscribe(() => {
      this.loginFailed = false;
    });
  }



  onSubmit(): void {
    if (this.form.valid) {
      const loginData = {
        username: this.form.value.username,
        password: this.form.value.password
      };

      this.authService.signIn(loginData).subscribe(
        response => {
          if (response && response.token) {
            console.log('Login successful', response);
            const token = response.token;

            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (1000 * 60 * 60 * 23.5));
            this.cookieService.set('authToken', token, expirationDate);

            this.router.navigate(['/']);
            this.loginFailed = false; // Reset error state on successful login
          } else {
            this.loginFailed = true;
          }
        },
        error => {
          console.error('Login failed', error);
          this.loginFailed = true;
        }
      );
    }
  }
}
