//отгадайте число

"use strict";

var secret, answer, minValue = 0, maxValue = 1000;

function getPromptText(prevAnswer, secret) {
	var str;
	switch (prevAnswer) {
		case undefined:
		case '': str = "Попробуйте угадать!"; break;
		default:
			prevAnswer = parseInt(prevAnswer);
			if (prevAnswer < secret) {
				str = "Загаданное число больше!";
			} else if (prevAnswer > secret) {
				str = "Загаданное число меньше!";
			} else if (prevAnswer == secret) {
				str = "Вы угадали! Давайте сыграем ещё раз? (Чтобы выйти нажмите отмена)";
			}
			else {
				str = "Введите число!";
			}
			break;
	}
	console.log(str);
	return str;
}

alert("Здравствуйте! Я загадал число от " + minValue + " до " + maxValue + ", попробуйте его отгадать.");
do {
	secret = Math.floor(Math.random() * ((maxValue + 1) - minValue) + minValue);
	console.log(secret);
	//начинаем игру
	do {
		console.log(answer); //для отладки программы, выведем правильный ответ в консоль
		//выводим новый проипт на основе предыдущего ответа
		answer = prompt(getPromptText(answer, secret));
	} while (answer != null && answer != secret);
	//Чтобы не выводить промпт, если надо закончить игру, но вывести, если угадан ответ
	if (answer != null) {
		answer = prompt(getPromptText(answer, secret));
	}
} while (answer != null);