import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'com-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() forDelete:any;
  @Output() onSubmit = new EventEmitter();

  constructor(
    public modal:NgxSmartModalService

  ) { }

  ngOnInit() {
  }

  show(){
    this.modal.getModal('modalId').open();
  }

  onClick_Submit(){
    this.onSubmit.emit();
    this.modal.getModal('modalId').close();
  }   
  
  onClick_Close(){
    this.modal.getModal('modalId').close();
  }

}
