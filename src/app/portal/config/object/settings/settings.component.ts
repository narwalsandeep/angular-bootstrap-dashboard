import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-object-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() object: any;
  constructor() { }

  ngOnInit() {
  }

}
