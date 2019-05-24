import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
    private router: Router
  ) { 

    localStorage.setItem('currentUser', JSON.stringify([]));
    this.router.navigate(['/signin']);
   
  }

  ngOnInit() {
  }

}
