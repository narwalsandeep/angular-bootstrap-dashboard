import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() editing_menu: any;
  selected_type = "html";
  menu_list = [
    {
      "type": "static"
    },
    {
      "type": "form"
    },
    {
      "type": "grid"
    },
    {
      "type":"code"
    }
  ]
  constructor() {
    // this.custom_el.sort();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editing_menu'] != undefined)
      this.editing_menu = changes['editing_menu'].currentValue;
  }

  onClick_CustomMenu(e) {
    this.selected_type = e.type;
  }
}
