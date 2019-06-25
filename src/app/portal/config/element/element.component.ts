import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input() config:any;
  @Input() editing_el: any;
  selected_type = "currency";
  el_list = [
    {
      "type":"text"
    },
    {
      "type":"dropdown",
    },
    {
      "type":"textarea",
    },
    {
      "type":"checkbox"
    },
    {
      "type":"date"
    },
    {
      "type":"time"
    },
    {
      "type":"file"
    },
    {
      "type":"currency"
    },

  ]
  constructor() {
   // this.custom_el.sort();
   }

  ngOnInit() {

  }

  onClick_CustomEl(e){
    this.selected_type = e.type;
  }
}
