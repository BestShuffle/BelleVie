import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-field-checkbox',
  templateUrl: './field-checkbox.component.html',
  styleUrls: ['../../form/form/form.component.sass', './field-checkbox.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldCheckboxComponent),
      multi: true
    }
  ]
})
export class FieldCheckboxComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  // @Input() icon: string;
  @Input() name: string;

  @Input() value: string;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() labelPosition: any;

  @Input() form: FormGroup;

  formControl: FormControl;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
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
    this.onChange(e.target.value);
    this.onTouched(e.target.value);
  }
}
