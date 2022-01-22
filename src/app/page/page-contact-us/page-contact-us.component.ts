import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-contact-us',
  templateUrl: './page-contact-us.component.html',
  styleUrls: ['./page-contact-us.component.sass']
})
export class PageContactUsComponent implements OnInit {

  formData = [
    {
      name: 'mail',
      icon: 'mail',
      type: 'text',
      label: 'Adresse mail',
      required: true,
    },
    {
      name: 'message',
      // icon: 'message',
      type: 'area',
      label: 'Message',
      required: true
    },
    {
      name: 'btnSubmit',
      type: 'submit',
      value: 'Envoyer',
      fullWidth: true
    }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
