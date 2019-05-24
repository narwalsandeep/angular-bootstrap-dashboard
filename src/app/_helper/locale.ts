export class LocaleHelper {
	
	constructor() {}
	
	public getLocale():string{
		let temp :any;
		temp =  JSON.parse(localStorage.getItem("locale"));

		// when application load first time, below 2 lines will setup
		if(temp == null || temp == undefined){
			temp = {"locale":"nb"};
			localStorage.setItem('locale', JSON.stringify(temp));
			console.log(temp);
		}
		
		if(temp.locale == undefined || temp.locale == ""){
			return "nb";
		}
		return temp.locale;
	}

	public setLocale(locale:String):boolean{
		if(locale == undefined || locale == ""){
			alert("Debug: Lang is empty, in locale.ts file");
			return false;
		}
		else {
			let temp :any;
			temp =  JSON.parse(localStorage.getItem("locale"));		

			temp.locale = locale;
			localStorage.setItem('locale', JSON.stringify(temp));
			console.log(temp);

			return true;
		}
		
	}
	
}