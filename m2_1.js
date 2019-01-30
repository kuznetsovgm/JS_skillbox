//определение наибольшего числа из двух

alert("Введите два числа, а я Вам отвечу, какое из них больше");
do {
	firstNumber = prompt("Введите первое число:");
} while (!parseInt(firstNumber));
do {
	secondNumber = prompt("Введите второе число:");
} while (!parseInt(secondNumber));
if (firstNumber > secondNumber) {
	alert("Первое число больше второго");
} else if (firstNumber < secondNumber) {
	alert("Первое число меньше второго");
} else {
	alert("Введённые числа равны");
}