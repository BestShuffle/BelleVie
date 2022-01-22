import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['../../form/form/form.component.sass', './field-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldSelectComponent),
      multi: true
    }
  ],
})
export class FieldSelectComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() hint: string;
  @Input() icon: string;
  @Input() name: string;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Input() value;

  @Input() options: MatOption;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  multiple: boolean;

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
