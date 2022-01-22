import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass']
})
export class PageComponent implements OnInit {
  @Input() fullWidth: boolean;
  @Input() slider: string;
  @Input() slogan: string;

  constructor() { }

  ngOnInit(): void {
  }
}
