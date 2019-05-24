import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';

 
@Injectable()
export class AlertService {

    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    
    /**
     * 
     * @param router 
     */
    constructor(private router: Router,private noty: NotifierService) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }
 
    /**
     * 
     * @param message 
     * @param keepAfterNavigationChange 
     */
    success(message: string, keepAfterNavigationChange = false) {
        this.noty.notify( 'success', message );
        
        //        this.keepAfterNavigationChange = keepAfterNavigationChange;
  //      this.subject.next({ type: 'success', text: message });
    }

    /**
     * 
     * @param message 
     * @param keepAfterNavigationChange 
     */
    info(message: string, keepAfterNavigationChange = false) {
        this.noty.notify( 'info', message );
        
        //        this.keepAfterNavigationChange = keepAfterNavigationChange;
  //      this.subject.next({ type: 'success', text: message });
    }
 
    /**
     * 
     * @param message 
     * @param keepAfterNavigationChange 
     */
    error(message: string, keepAfterNavigationChange = false) {
        this.noty.notify( 'error', message );
          
      //  this.keepAfterNavigationChange = keepAfterNavigationChange;
       // this.subject.next({ type: 'error', text: message });
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}