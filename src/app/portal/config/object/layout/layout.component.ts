import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-object-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Input() object : any;
  constructor() { }

  ngOnInit() {
    console.log(this.object);
  }

}
