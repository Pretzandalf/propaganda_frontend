import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiGroup,
  TuiIcon,
  TuiLabel,
  TuiRoot,
  TuiTextfieldComponent, TuiTextfieldDirective,
  TuiTitle
} from "@taiga-ui/core";
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiInputSliderModule,
  TuiSelectModule, TuiTextfieldControllerModule
} from '@taiga-ui/legacy';
import {
  TuiBlock, TuiButtonLoading,
  TuiCheckbox,
  TuiFieldErrorPipe,
  TuiInputNumber,
  TuiPassword, TuiRadioComponent,
  TuiStep,
  TuiStepperComponent,
  TuiTooltip
} from '@taiga-ui/kit';
import {AsyncPipe} from '@angular/common';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiCardLarge, TuiForm, TuiHeader} from '@taiga-ui/layout';
import {RegisterComponent} from './register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiButton, TuiInputModule, TuiError, TuiIcon, TuiTextfieldComponent, TuiStepperComponent, TuiInputDateModule, TuiFieldErrorPipe, AsyncPipe, TuiCurrencyPipe, TuiInputNumber, TuiInputSliderModule, TuiSelectModule, TuiInputPhoneModule, TuiGroup, TuiCheckbox, TuiLabel, TuiStep, TuiForm, TuiHeader, TuiTitle, TuiTextfieldDirective, TuiTooltip, TuiPassword, TuiTextfieldControllerModule, TuiBlock, TuiRadioComponent, TuiButtonLoading, TuiAppearance, TuiCardLarge, RegisterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
  ) {
  }
  title = 'ac';

  ngOnInit() {
  }
}
