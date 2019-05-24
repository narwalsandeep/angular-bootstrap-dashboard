import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../_service/_alert.service';
 
@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
 
/**
 * AS OF 31 AUGUST, THIS IS NOT USED, 
 * ANGULAR-NOTIFIER IS USED NOW
 * DELETE THIS DIRECTIVE ANYTIME SOON
 */
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }
 
    ngOnDestroy() {
//        this.subscription.unsubscribe();
    }

    close(message){
        this.message = false;
    }
    
}