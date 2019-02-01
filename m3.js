//отгадайте число

"use strict";

var secret, answer, minValue = 0, maxValue = 1000, attempts;

function getPromptText(prevAnswer, secret, attempts) {
	var str;
	if (attempts == 0) {
		str = "У Вас закончились попытики. Попробуйте ещё раз. (Чтобы выйти нажмите отмена)";
		return str;
	}
	switch (prevAnswer) {
		case undefined:
		case '': str = "Попробуйте угадать! У Вас " + attempts + " попытки"; break;
		default:
			prevAnswer = parseInt(prevAnswer);
			if (prevAnswer < secret) {
				str = "Загаданное число больше! У Вас осталось " + attempts + " попытки";
			} else if (prevAnswer > secret) {
				str = "Загаданное число меньше! У Вас осталось " + attempts + " попытки";
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

alert("Здравствуйте! Я загадал число от " + minValue + " до " + maxValue + ", попробуйте его отгадать.");
do {
	secret = Math.floor(Math.random() * ((maxValue + 1) - minValue) + minValue);
	console.log(secret);
	attempts = 3;
	answer = undefined;
	//начинаем игру
	do {
		console.log(answer); //для отладки программы, выведем правильный ответ в консоль
		//выводим новый промпт на основе предыдущего ответа
		answer = prompt(getPromptText(answer, secret, attempts));
		attempts--;
	} while (answer != null && answer != secret && attempts > 0);
	//Чтобы не выводить промпт, если надо закончить игру, но вывести, если угадан ответ
	if (answer != null) {
		answer = prompt(getPromptText(answer, secret, attempts));
	}
} while (answer != null);