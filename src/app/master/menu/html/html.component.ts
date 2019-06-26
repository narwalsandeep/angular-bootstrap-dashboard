import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit {

  default = {  "type": "html" };
  menu: any;
  @Input() config: any;
  @Input() editing_menu: any;
  is_edit_mode = false;

  constructor() { }

  ngOnInit() {
  }

}
