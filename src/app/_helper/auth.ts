export class AuthHelper {
	
	constructor() {}
	
	public isLoggedIn(): boolean{
		let temp: any;
		temp =  JSON.parse(localStorage.getItem("currentUser"));
		if(temp != undefined){
			if(temp.id != undefined){
				if(temp.auth_token != undefined || temp.auth_token != ""){
					return true;
				}
			}
		}
		return false;
	}
	public getUser(): any {
		let temp :any;
		temp =  JSON.parse(localStorage.getItem("currentUser"));
		if(temp != null){
			return temp;
		}
		else{
			// set default object if not logged, else it give undefined property error on landing page
			return temp = {"auth_token":""};
		}
	}
	public setUser(_new_data:any): any {
		let temp:any;
		// if we do temp = [] below, it will not work
		// because [] makes it an array
		temp = _new_data;
		localStorage.setItem('currentUser', JSON.stringify(temp));
	}

	public getLocale():string{
		let temp :any;
		temp =  JSON.parse(localStorage.getItem("currentUser"));
		
		if(temp.locale == undefined || temp.locale == ""){
			return "nb";	
		}
		return temp.locale;
	}

	
}