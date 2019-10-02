import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  players = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userService.readAll().subscribe(data=>{
      let temp:any;
      temp = data;
      this.players = temp.data;
    })
  }

  onClick_Item(p){
    alert(p.id+" clicked");
  }


}
