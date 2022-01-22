import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {checkMatch} from '../../class/must-match';
import {DialogService} from '../../service/dialog.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.sass']
})
export class DynamicFormComponent implements OnInit {

  @Input() formConfig = [];
  @Input() colored: boolean;
  form: FormGroup;
  formFields = {};

  private submitDatasSource = new BehaviorSubject<any>(undefined);
  public submitDatas: any = this.submitDatasSource.asObservable();

  constructor(private serviceDialog: DialogService) {
  }

  onSubmit(): void {
    this.setSubmitDatas(this.form);
  }

  ngOnInit(): void {
    for (const config of this.formConfig) {
      const controlsValidators = this.createControlsValidators(config);
      this.formFields[config.name] = new FormControl(config.value || '', controlsValidators);
    }
    this.form = new FormGroup(this.formFields, checkMatch);
  }

  createControlsValidators(config: any): any {
    const validators = [];
    if (config.required) {
      validators.push(Validators.required);
    }
    if (config.minLength) {
      validators.push(Validators.minLength(config.minLength));
    }
    if (config.maxLength) {
      validators.push(Validators.maxLength(config.maxLength));
    }
    if (config.type === 'email') {
      validators.push(Validators.email);
    }
    return validators;
  }

  getSubmitDatas(): any {
    return this.submitDatasSource.asObservable();
  }

  setSubmitDatas(submitDatas: any): void {
    this.submitDatasSource.next(submitDatas);
  }

  setValues(values: any): void {
    this.form.setValue(values);
  }

  onClickButton(element: any): void {
    this.serviceDialog.closeDialog();
  }
}
