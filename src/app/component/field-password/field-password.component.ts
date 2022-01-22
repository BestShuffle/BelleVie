import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-field-password',
  templateUrl: './field-password.component.html',
  styleUrls: ['../../form/form/form.component.sass', './field-password.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldPasswordComponent),
      multi: true
    }
  ],
})
export class FieldPasswordComponent implements OnInit, ControlValueAccessor {
  @Input() name: string;
  @Input() label: string;

  @Input() value: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() readonly: boolean;

  hidePassword = true;

  @Input() form: FormGroup;
  formControl: FormControl;

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    if (this.form) {
      this.formControl = (this.form.controls[this.name] as FormControl);
    }
  }

  writeValue(newVal: string): void {
    this.value = newVal;
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  change(e): void {
    this.onChange(e.target.value);
    this.onTouched(e.target.value);
  }
}
