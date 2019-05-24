export class UrlHelper {
	
	subdomain = "";
	constructor() {}
	
	/**
	 * 
	 */
	getSubdomain() {

		const domain = window.location.hostname;
		let _f = domain.split('.')[0];
		if (domain.indexOf('.') < 0 ||  _f === 'bookitlocal' || _f === 'bookit24' || _f === 'lvh' || _f === 'www') {
			this.subdomain = '';
		} else {
			this.subdomain = domain.split('.')[0];
		}
		return this.subdomain;
	}	

	getDomainName(){
		return window.location.href.split("/#/")[0];

	}
}
