import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-field-quantity',
  templateUrl: './field-quantity.component.html',
  styleUrls: ['./field-quantity.component.sass']
})
export class FieldQuantityComponent implements OnInit {

  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>();

  constructor() {
    if (!this.value) {
      this.value = 1;
    }
  }

  ngOnInit(): void {
  }

  onClickAdd($event: MouseEvent): void {
    this.value++;
    this.updateValue();
  }

  onClickRemove($event: MouseEvent): void {
    this.value--;
    this.updateValue();
  }

  updateValue(): void {
    this.valueChange.emit(this.value);
  }
}
