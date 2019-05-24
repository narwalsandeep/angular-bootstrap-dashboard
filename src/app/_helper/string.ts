export class StringHelper {
	
	/**
	 * 
	 */
	constructor() {}
	
	/**
	 * 
	 * @param email 
	 */
	isValidEmail(email){
		let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return  regexp.test(email);

	}
	
	hasSomething(string){
		let str = string;
		if(str != null && str != "null" && str != 'undefined' && str != undefined && str != 0 && str != ""){
			return true;
		}
		return false;
	}
}
