import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input() config: any;
  @Input() editing_el: any;
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
    // this.custom_el.sort();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editing_el'] != undefined)
      this.editing_el = changes['editing_el'].currentValue;
    if (changes['config'] != undefined)
      this.config = changes['config'].currentValue;
  }

  onClick_CustomEl(e) {
    this.selected_type = e.type;
  }
}
