import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonComponent),
    multi: true,
  }],
})
export class ButtonComponent implements OnInit, ControlValueAccessor {

  @Input() routerLink: string;
  @Input() formCtrl: AbstractControl;
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() icon: string;
  @Input() classes: string;
  @Input() midWidth: boolean;

  constructor() {
  }

  ngOnInit(): void{
  }

  writeValue(value: string): void {
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onChangeFn = (_: any) => {
  }
}
