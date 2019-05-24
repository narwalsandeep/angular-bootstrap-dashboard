import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = "DASHBOARD";
  is_loading = false;

  entity_recordset: any;
  settings = {
    attr: {
      class: 'table table-bordered'
    },
    actions: false,
    columns: {
      device_name: {
        title: "Device"
      },
      type: {
        title: "Type"
      },
      to:{
        title: "To"
      },
      From: {
        title: "From"
      },
      Trigger: {
        title: "Trigger"
      },
      status:{
        title: "Status"
      }
    }
  };
  config = {
    "title":"Sensor Name",
    "data": [
      159,
      245,
      183,
      203,
      289,
      292,
      34
    ],
    "labels":[
      '1',
      '2',
      '3',
      '4'
    ]
  }

  constructor(
    private router: Router,

  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }

  ngOnInit() {
  }


  onClick_Record(e){
    
  }


}
