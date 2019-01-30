//отображение суммы введённых чисел


sum = 0;
do {
	number = prompt("Введите число:");
	num = parseInt(number);
	if (num) {
		sum += num;
	}
} while (number != null);
alert("Сумма введённых чисел равна: " + sum);