import {
  TuiAlertContext, TuiAlertService,
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiGroup,
  TuiIcon,
  TuiLabel, TuiLoader,
  TuiRoot,
  TuiScrollbar,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTitle
} from "@taiga-ui/core";
import {Component, HostListener, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiInputSliderModule,
  TuiSelectModule, TuiTextareaModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/legacy';
import {
  TuiAvatar,
  TuiBlock,
  TuiButtonLoading,
  TuiCheckbox, TuiDataListDropdownManager,
  TuiFieldErrorPipe,
  TuiInputNumber, TuiInputPin, TuiLineClamp,
  TuiPassword, TuiPin,
  TuiRadioComponent,
  TuiStep,
  TuiStepperComponent,
  TuiTooltip, tuiValidationErrorsProvider
} from '@taiga-ui/kit';
import {AsyncPipe, NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {TuiCurrencyPipe, TuiThumbnailCard} from '@taiga-ui/addon-commerce';
import {TuiCardLarge, TuiForm, TuiHeader} from '@taiga-ui/layout';
import {RegisterComponent} from './register.component';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './auth.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {tuiMarkControlAsTouchedAndValidate} from '@taiga-ui/cdk';
import {TuiSheetDialog, TuiSheetDialogOptions} from '@taiga-ui/addon-mobile';
import {HttpResponse} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

interface Message {
  content: string;
  time: Date;
  isOwn: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TuiRoot,
    TuiButton,
    TuiInputModule,
    TuiError,
    TuiIcon,
    TuiTextfieldComponent,
    TuiStepperComponent,
    TuiInputDateModule,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiCurrencyPipe,
    TuiInputNumber,
    TuiInputSliderModule,
    TuiSelectModule,
    TuiInputPhoneModule,
    TuiGroup,
    TuiCheckbox,
    TuiLabel,
    TuiStep,
    TuiForm,
    TuiHeader,
    TuiTitle,
    TuiTextfieldDirective,
    TuiTooltip,
    TuiPassword,
    TuiTextfieldControllerModule,
    TuiBlock,
    TuiRadioComponent,
    TuiButtonLoading,
    TuiAppearance,
    TuiCardLarge,
    RegisterComponent,
    TuiAvatar,
    TuiScrollbar,
    NgClass,
    FormsModule,
    TuiTextareaModule,
    ReactiveFormsModule,
    TuiPin,
    TuiThumbnailCard,
    TuiLoader,
    TuiLineClamp,
    TuiDataListDropdownManager,
    NgIf,
    TuiSheetDialog,
    NgOptimizedImage,
    TuiInputPin
  ],
  templateUrl: './index.component.html',
  styleUrls: ['./app.component.css'],
})
export class IndexComponent implements OnInit {
  protected readonly form = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.max(1000)]),
  });
  code = new FormControl('', [Validators.required, Validators.min(4)])
  lastChecked: String = ""
  protected open = false;
  is2Fa = false;
  checked = true;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router, private sanitizer: DomSanitizer) {
    this.authService.getUser().subscribe(response => {
      this.user = response
      console.log(this.user)
      this.updateP.setControl("name", new FormControl(this.user.firstName, [Validators.required, Validators.min(4)]))
      this.updateP.setControl("lastName", new FormControl(this.user.lastName, [Validators.required, Validators.min(4)]))
    }, error => console.log(error))
    authService.is2Fa().subscribe(is2Fa => {
      this.is2Fa = is2Fa
      this.checked = false
    })
  }

  protected openD = false;
  user: any;
  protected readonly options: Partial<TuiSheetDialogOptions> = {
    label: 'Profile',
    closeable: false,
  };
  time = ""

  ngOnInit() {
    this.code.valueChanges.subscribe(value => {
      if (value!.length == 6) this.otpCheck(value!);
      else this.incorrect = false
    })
    let datetime = new Date();
    if (datetime.getHours() < 6) {
      this.time = "night"
    } else if (datetime.getHours() < 12) {
      this.time = "morning"
    } else if (datetime.getHours() < 17) {
      this.time = "afternoon"
    } else if (datetime.getHours() < 24) {
      this.time = "evening"
    }
    if (!this.cookieService.get("authToken")) {
      this.router.navigate(['/login']);
    } else {
      this.authService.validate().subscribe(() => {
        },
        () => {
          this.cookieService.delete("authToken");
          this.router.navigate(['/login']);
        }
      );
    }
  }

  loading: boolean = false;
  result: String = ""
  color: String = "#000000"

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.form.value.text?.toString() !== this.lastChecked.toString()) {
      this.color = "black"
      this.result = ""
    }
    if (event.shiftKey && event.key === 'Enter') {
      if (this.form.value.text != undefined && this.form.value.text!.length <= 65500) {
        event.preventDefault(); // Prevent default newline behavior in textarea
        if (this.form.valid) {
          this.loading = true;
          this.authService.getInfo(this.form.value.text).subscribe(
            response => {
              this.loading = false;
              console.log(response.result);
              this.lastChecked = this.form.value.text!.toString();
              switch (response.result) {
                case "Propaganda":
                  this.result = "This is probably propaganda!"
                  this.color = "red"
                  break;
                case "Not propaganda":
                  this.color = "green"
                  this.result = "Yeah, that's probably not propaganda! :D"
              }
            }, error => {
              this.loading = false;
              this.color = "red"
              this.result = "Something went wrong :( Check your request and try again!"
              console.log("err: " + error.message + " " + error.text);
            }
          );
        }
      }
    }
  }


  exitClick(): void {
    this.cookieService.delete("authToken");
    this.router.navigate(['/login']);
  }

  updateP: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(4)]),
    lastName: new FormControl('', [Validators.required, Validators.min(4)]),
    avatarUrl: new FormControl('', [Validators.required, Validators.min(4)]),
  });
  qrE = "";

  onMfa() {
    this.authService.getQr().subscribe((response: HttpResponse<any>) => {
      console.log(response.body)
      this.qrE = URL.createObjectURL(response.body);
      console.log(this.qrE);
    })
  }
  incorrect = false;
  otpCheck(code: String): boolean {
    this.authService.otp(code).subscribe(
      response => {
        this.checked = true;
      }, error => {
        this.incorrect = true;
      }
    )
    return false;
  }
}
