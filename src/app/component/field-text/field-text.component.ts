import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-field-text',
  templateUrl: './field-text.component.html',
  styleUrls: ['../../form/form/form.component.sass', './field-text.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldTextComponent),
      multi: true
    }
  ],
})
export class FieldTextComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() hint: string;
  @Input() icon: string;
  @Input() name: string;

  @Input() value: any;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() readonly: boolean;

  @Input() form: FormGroup;

  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() type: string;
  formControl: FormControl;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    if (!this.maxLength) {
      this.maxLength = 1000;
    }
    if (!this.value) {
      this.value = '';
    }
  }

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
    this.writeValue(e.target.value);
    this.onChange(e.target.value);
    this.onTouched(e.target.value);
  }
}
