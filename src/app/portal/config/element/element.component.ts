import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input() object: any;
  @Input() element: any;
  selected_type = "text";
  el_list = [
    {
      "type": "text"
    },
    {
      "type": "dropdown",
    },
    {
      "type": "textarea",
    },
    {
      "type": "checkbox"
    },
    {
      "type": "date"
    },
    {
      "type": "time"
    },
    {
      "type": "file"
    },
    {
      "type": "currency"
    },
    {
      "type": "separator"
    }

  ]
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['object'] != undefined)
      this.object = changes['object'].currentValue;
    if (changes['element'] != undefined)
      this.element = changes['element'].currentValue;

  }

  onClick_CustomEl(e) {
    this.selected_type = e.type;
  }
}
