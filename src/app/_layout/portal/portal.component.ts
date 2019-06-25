import { Component, OnInit } from '@angular/core';
import {infra} from '../../../assets/infra';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  defaults :any;
  constructor() {
    this.defaults = infra;
   }

  ngOnInit() {
  }

}
