/*
Доработайте домашнее задание к 3 модулю (загадывание случайного числа от 1 до 1000) следующим образом:
— разделите программу на два файла: main.js (основной запускающий код программы)
и lib.js (код модуля для загадывания чисел)
— оформите код lib.js в виде модуля с использованием IIFE, который выносит в глобальную зону 
видимости (window) только одну функцию (например, start) для старта игры
— соответственно, main.js должен вызывать функцию start, которая объявлена в файле lib.js
— загаданное число и кол-во попыток пользователя должны храниться «в замыкании», т.е. во
внешней по отношению к функции start зоне видимости (чтобы к ним не было доступа из
глобальной зоны видимости и их нельзя было легко поменять)
— кол-во попыток пользователя должно быть ограничено 10 (после этого выводится
сообщение с предложением начать игру заново)
*/

"use strict";

(function() {


	var getPromptText = function (prevAnswer, secret, attempts) {
		//функция возвращает окончание для числа digit (для слова ПОПЫТка)
		var getEnding = function () {
			var lastDigit = attempts % 100, str;
			//последние цифры не в диапазоне от 5 до 20 - окончание -ов
			if (lastDigit > 20 || lastDigit < 5) {
				//последние цифры для окончания
				lastDigit %= 10;
				if (lastDigit >= 2 && lastDigit <= 4) { 
					str = 'ки';
				} else if (lastDigit != 1) {
					str = 'ок';
				} else {
					str = 'ка ';
				}
			} else {
				str = 'ок';
			}
			return str;
		}

		var str;
		if (attempts <= 0 && prevAnswer != secret) {
			str = "У Вас закончились попытики. Загаданное число " + secret + ". Попробуйте ещё раз. (Чтобы выйти нажмите отмена)";
			return str;
		}
		switch (prevAnswer) {
			case undefined:
			case '': str = "Попробуйте угадать! У Вас " +
				attempts + " попыт" + getEnding(attempts); break;
			default:
				prevAnswer = parseInt(prevAnswer);
				if (prevAnswer < secret) {
					str = "Загаданное число больше! У Вас осталось " +
						attempts + " попыт" + getEnding(attempts);
				} else if (prevAnswer > secret) {
					str = "Загаданное число меньше! У Вас осталось " +
						attempts + " попыт" + getEnding(attempts);
				} else if (prevAnswer == secret) {
					str = "Вы угадали! Давайте сыграем ещё раз? (Чтобы выйти нажмите отмена)";
				}
				else {
					str = "Введите число!";
				}
				break;
		}
		return str;
	}

	var secret = function (minValue, maxValue) {
		var secret = Math.floor(Math.random() * ((maxValue + 1) - minValue) + minValue);
		return function () {
			return secret;
		}
	}

	var attempts = function () {
		var attempts = 10;
		return function() {
			return attempts--;
		}
	}

	window.startGame = function () {
		//debugger;
		var minValue = 0, maxValue = 1000;
		alert("Здравствуйте! Я загадал число от " + minValue +
			" до " + maxValue + ", попробуйте его отгадать.");
		do {
			var x = secret(minValue, maxValue);
			console.log(x()); //вывод правильного ответа в консоль для отладки
			var a = attempts();
			var answer = undefined;
			var n;
			do {
				n = a();
				answer = prompt(getPromptText(answer, x(), n));
			} while (answer !== null && answer != x() && (n - 1) > 0);
			if (answer !== null) {
				answer = prompt(getPromptText(answer, x(), (n - 1)));
			}
		} while (answer !== null)

	}
})();
