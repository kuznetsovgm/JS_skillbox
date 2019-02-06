//Программа выводит в консоль текущую дату в полном русскоязычном формате,
//например: «Сегодня 6 декабря 2016 года, вторник, 20 часов 6 минут 54 секунды».

"use strict";
var date;

function getFullDateRus (date) {

	//функция возвращает окончание (digit - число, type - род('m' / 'f'))
	function getEnding (digit, type) {
		var lastDigit = digit % 100, str;
		//последние цифры не в диапазоне от 5 до 20 - окончание -ов
		if (lastDigit > 20 || lastDigit < 5) {
			//последние цифры для окончания -а
			lastDigit %= 10;
			if (lastDigit >= 2 && lastDigit <= 4) { 
				type == 'm' ? str = 'а ' : str = 'ы ';
			} else if (lastDigit != 1) {
				type == 'm' ? str = 'ов ' : str = ' ';
			} else {
				type == 'm' ? str = ' ' : str = 'а ';
			}
		} else {
			type == 'm' ? str = 'ов ' : str = ' ';
		}
		return str;
	}

	function getWeekday(day){
		switch (day) {
			case 0: return 'воскресенье';
			case 1: return 'понедельник';
			case 2: return 'вторник';
			case 3: return 'среда';
			case 4: return 'четверг';
			case 5: return 'пятница';
			case 6: return 'суббота';
			default: return '';
		}
	}

	function getMonth (month) {
		switch (month) {
			case 0: return 'января';
			case 1: return 'февраля';
			case 2: return 'марта';
			case 3: return 'апреля';
			case 4: return 'мая';
			case 5: return 'июня';
			case 6: return 'июля';
			case 7: return 'августа';
			case 8: return 'сентября';
			case 9: return 'октября';
			case 10: return 'ноября';
			case 11: return 'декабря';
			default: return '';
		}
	}
	
	return "Сегодня " + date.getDate() + " " + getMonth(date.getMonth()) + " " +
		date.getFullYear() + " года, " + getWeekday(date.getDay()) + ", " +
		date.getHours() + " час" + getEnding(date.getHours(), 'm') +
		date.getMinutes() + " минут" + getEnding(date.getMinutes(), 'w') +
		date.getSeconds() + " секунд" + getEnding(date.getSeconds(), 'w');
}

setInterval(function() {
	date = new Date();
	console.log(getFullDateRus(date));
}, 1000);