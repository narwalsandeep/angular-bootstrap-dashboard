import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { BusinessService } from '../../../_service/business.service';
import { AuthHelper } from '../../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertService } from '../../../_service/_alert.service';
import { ModalComponent } from '../../../_com/modal/modal.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-master-object-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {

  @ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

  @Input() object: any;
  content = "";

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '400px',
    width: 'auto',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter contents here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
  };
  /**
   * 
   * @param businessService 
   */
  constructor(
    private businessService: BusinessService,
    private authHelper: AuthHelper,
    private _alert: AlertService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['object'] != undefined) {
      this.object = changes['object'].currentValue;
      this.content = this.object.html;
    }
  }


  /**
  * 
  */
  _getBusiness() {
    let _p = { "id": this.authHelper.getUser().business.id };
    let _t = this;
    this.businessService.read(_p).subscribe(function (data) {
    });
  }

  onClick_Submit() {
    if (this._validate()) {
      let _p = { "add_object_static_content": true, "content": this.content, "object": JSON.stringify(this.object) };
      this.businessService.updateConfig(_p).subscribe(data => {
        let temp: any;
        temp = data;
        if (temp.error) {
          this._alert.error(temp.msg);
        }
        else {
          this._alert.success(temp.msg);
        }
      },
        error => {
          this._alert.error("Server Error");
        });
    }

  }

  _validate() {
    return true;
  }


}
