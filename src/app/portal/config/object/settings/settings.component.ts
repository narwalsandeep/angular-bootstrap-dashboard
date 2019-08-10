import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-object-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() object: any;
  @Output() refreshConfig = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

   // if chancing here, also change in object component
   onRefreshConfig(e){
    this.refreshConfig.emit(true);
    // emit from this to its parent to call business main config json, so it get refresh all over
    // refreshConfig must be added as many places to its get refresh everywhere.
  }

}
