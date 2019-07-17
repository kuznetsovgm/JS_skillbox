// Написать функцию filterByType, которая принимает любое кол-во аргументов:
// первый аргумент — это тип данных (number, string или boolean), по которому нужно отфильтровать следующие аргументы (со 2-го и далее);
// аргументы, начиная со 2-го и далее — любые значения;
// функция должна возвращать массив с теми аргументами, которые соответствуют типу данных, переданному в первом аргументе.
// Пример вызова:
// filterByType('string', 10, 20, 'a', 'b', true, false);
// // возвращает массив [‘a’, ‘b']


(function() {
	"use strict";

	window.filterByType = function() {
		var type = arguments[0];
		var res = [];
		for (var i = 1; i < arguments.length; i++) {
			if (typeof(arguments[i]) == type) {
				res.push(arguments[i]);
			}
		}
		return res;
	}

	console.log(filterByType('string', 10, 20, 'a', 'b', true, false));

})();