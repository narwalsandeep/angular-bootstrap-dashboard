export class CalendarHelper {

	slots = Array();
	hr = [
		"00",
		"01",
		"02",
		"03",
		"04",
		"05",
		"06",
		"07",
		"08",
		"09",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"23",
		"24"
	];

	min15 = ["00", "15", "30", "45"];
	min30 = ["00", "30"];
	min60 = ["00"];

	constructor() { }

	getSlot(slot) {

		if (slot == 15) {
			return this._getSlot15();
		}

		if (slot == 30) {
			return this._getSlot30();
		}

		if (slot == 60) {
			return this._getSlot60();
		}


	}

	_getSlot15() {

		let temp = [];

		this.hr.forEach(h => {
			this.min15.forEach(m => {
				temp.push(h + ":" + m);
			});
		});
		return temp;
	}

	_getSlot30() {

		let temp = [];

		this.hr.forEach(h => {
			this.min30.forEach(m => {
				temp.push(h + ":" + m);
			});
		});
		return temp;
	}

	_getSlot60() {

		let temp = [];

		this.hr.forEach(h => {
			this.min60.forEach(m => {
				temp.push(h + ":" + m);
			});
		});
		return temp;
	}

}