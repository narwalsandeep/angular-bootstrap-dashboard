import { Component, OnInit, Input, SimpleChange, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  @Input() object: any;
  @Output() refreshConfig = new EventEmitter<boolean>();

  selected = "form";
  types = [
    {
      "name": "form"
    },
    {
      "name": "static"
    },
    {
      "name": "grid"
    },
    {
      "name":"code"
    }
  ]

  /**
   * 
   */
  constructor() {
    // this.custom_el.sort();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['object'] != undefined)
      this.object = changes['object'].currentValue;
  }

  onClick_CustomMenu(e) {
    this.selected = e.type;
  }

  // if chancing here, also change in settings component
  onRefreshConfig(e){
    this.refreshConfig.emit(true);
    // emit from this to its parent to call business main config json, so it get refresh all over
    // refreshConfig must be added as many places to its get refresh everywhere.
  }
}
