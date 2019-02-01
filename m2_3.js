//отображение суммы введённых чисел


sum = 0;
str = "Введите число:";
do {
	number = prompt(str);
	num = parseInt(number);
	if (num || num == 0) {
		sum += num;
		str = "Введите следующее число:";
	} else {
		str = "Нужно ввести число:";
	}
} while (number != null);
alert("Сумма введённых чисел равна: " + sum);