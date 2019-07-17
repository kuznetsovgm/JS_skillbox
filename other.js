/*
Массив частичных сумм
На входе массив чисел, например: arr = [1,2,3,4,5].
Напишите функцию getSums(arr), которая возвращает массив его частичных сумм.
Иначе говоря, вызов getSums(arr) должен возвращать новый массив из такого же числа элементов, в котором на каждой позиции должна быть сумма элементов arr до этой позиции включительно.
То есть:
для arr = [ 1, 2, 3, 4, 5 ]
getSums( arr ) = [ 1, 1+2, 1+2+3, 1+2+3+4, 1+2+3+4+5 ] = [ 1, 3, 6, 10, 15 ]
Еще пример: getSums([-2,-1,0,1]) = [-2,-3,-3,-2].
Функция не должна модифицировать входной массив.
В решении используйте метод arr.reduce.
*/
function getSums(arr = []) {
	let res = [];
	if (!arr.length) return res;
	arr.reduce(function(prev, current) {
		let sum = prev + current;
		res.push(sum);
    	return sum;
    }, 0);
	return res;
}

/*
Написать функцию - аналог Array.reduce()
*/
function reduse(arr = [], f, init = arr[0]) {
	if(!arr.length) return null;
	let i = 0, res = init;
	if(arguments.length == 2) {
		i = 1;
		res = arr[0];
	}
	for(i; i < arr.length; i++) {
		res = f(res, arr[i], i, arr);
		console.log(i);
    }
	return res;
}