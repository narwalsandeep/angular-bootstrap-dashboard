import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-master-object-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  @Input() object: any;

  constructor() { }

  ngOnInit() {
  }

}
