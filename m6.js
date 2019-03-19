/*
Напишите простой прототип системы регистрации пользователей.
Для этого используйте две функции-конструктора:
1. User, которая создает объект типа «пользователь» со следующими свойствами:
{
// имя
firstName: ‘',
// фамилия
lastName: '’,
// дата и время регистрации
regDate: ''
}
Объекты типа User предназначены для сохранения каждой отдельной записи о пользователе.
2. UserList, которая создает объект типа «список пользователей» со следующими свойствами и методами:
{
// внутреннее свойство-массив, в которое будут попадать объекты типа User
users: [],
// метод получает в качестве параметра объект типа User и сохраняет его в массив users
add: function(user) {},
// метод возвращает список пользователей из массива users
getAllUsers: function() {}
}
Объекты типа UserList предназначены для хранения множества записей типа User.
При запуске программы должно происходить следующее:
1. Создавать новый экземпляр объекта UserList (с пустым свойством-массивом users)
2. Открываться диалог prompt с предложением ввести имя и фамилию пользователя для регистрации (одной строкой через пробел)
3. После нажатия ОК должен создаваться новый экземпляр объекта User с заполнением свойств firstName, lastName и regDate (текущая дата и время)
4. Созданный экземпляр объекта должен сохраняться в свойство-массив users созданного ранее объекта типа UserList (при помощи метода add)
5. Диалог prompt должен повторяться, пока пользователь не нажмет «Отмена»
6. После нажатия «Отмена» выведите на экран (в консоль или при помощи alert) список всех пользователей с именами и датами регистрации (используйте для этого метод getAllUsers)
*/

"use strict";

function User (firstName, secondName) {
	function appendZero (number) {
		return number > 9 ? number : '0' + number;
	}

	var date = new Date();
	this.regDate =   appendZero(date.getDate() + 1) + '.'
					+ appendZero(date.getMonth() + 1) + '.'
					+ date.getFullYear() + ' '
					+ appendZero(date.getHours()) + ':'
					+ appendZero(date.getMinutes()) + ':'
					+ appendZero(date.getSeconds());

	this.firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1);
	this.secondName = secondName.charAt(0).toUpperCase() + secondName.substring(1);

	this.getFullName = function () {
		return this.firstName + ' ' + this.secondName;
	}
}

function UserList () {
	this.users = [];

	this.add = function (user) {
		for (var i = this.users.length - 1; i >= 0; i--) {
			if (this.users[i].secondName === user.secondName && this.users[i].firstName === user.firstName) {
				console.log("Пользователь с такими именем и фамилией уже зарегестрирован.")
				return false;
			}
		}
		this.users.push(user);
	}
	this.getAllUsers = function (user) {
		var i = this.users.length - 1;
		for (i; i >= 0; i--) {
			console.log(this.users[i].getFullName() + ' ' + this.users[i].regDate);
		}
	}
}

var userList = new UserList();
do {
	var str = prompt('Введите Ваши имя и фамилию через пробел:');
	if (str != null && str != undefined) {
		var arr = str.trim().replace(/\s{2,}/g, ' ').replace(/[^a-zа-я\s]/ig, '').split(/ /g);
		if (arr[1] != undefined && arr[1] != '') {
			var user = new User(arr[0], arr[1]);
			userList.add(user);
		}
	}
} while (str != null);
userList.getAllUsers();
