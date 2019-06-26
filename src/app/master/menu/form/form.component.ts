import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  default = {  "type": "form" };
  menu: any;
  @Input() config: any;
  @Input() editing_menu: any;
  is_edit_mode = false;

  constructor() { }

  ngOnInit() {
  }

}
