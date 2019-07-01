import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-object-triggers',
  templateUrl: './triggers.component.html',
  styleUrls: ['./triggers.component.css']
})
export class TriggersComponent implements OnInit {

  @Input() object : any;
  constructor() { }

  ngOnInit() {
  }

}
