//авторизация пользователя
//Создайте массив users, в котором каждый элемент — это объект типа «пользователь»
//со свойствами «имя», «логин» и «пароль».
//Программа должна запрашивать у пользователя логин и пароль при помощи prompt,
//после чего проходиться по массиву users и искать в нем объект с такими же значениями.
//Если пользователь найден в массиве users, то программа должна поздороваться с ним по имени.
//В противном случае должна появиться ошибка авторизации.

"use strict";

(function(){
	var users = [
		{
			userName: 'name1',
			login: 'login1',
			password: 'pass1'
		},
		{
			userName: 'name2',
			login: 'login2',
			password: 'pass2'
		},
		{
			userName: 'false',
			login: 'login',
			password: 'pass'
		},
		{
			userName: 'name3',
			login: 'log3',
			password: 'pass3'
		}
	];

	window.authorization = function (login, password) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].login == login && users[i].password == password) {
				return users[i].userName;
			}
		}
		return false;
	}
})();

var login = prompt("Введите логин");
var password = prompt("Введите пароль");

var userName = authorization(login, password);
if (userName !== false) {
	alert("Добро пожаловать, " + userName + "!");
} else {
	alert("Неверная пара логин/пароль");
}