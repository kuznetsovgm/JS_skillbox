/*
Создайте иерархию сущностей (конструкторов, из которых можно создать экземпляры объектов):

• базовый конструктор «Транспортное средство» с общими для всех транспортных 
	средств свойствами и методами (на ваше усмотрение)
• дочерние конструкторы: автомобиль, самолёт, корабль, которые наследуют 
	общие свойства и методы от родительского
• продемонстрируйте, как дочерние сущности могут переопределять родительские 
	свойства и методы в соответствии со своим собственным поведением
*/

"use strict"

var Transport = function (make, model) {
	this.make = make;
	this.model = model;
	this.fuelCapacity;
	this.fuelLevel = 0;
	this.fuelRate;
	this.turnedOn = false;


}

Transport.prototype.fuel = function (level) {
	if (arguments.length > 0) {
		this.fuelLevel = level;
	} else {
		return this.fuelLevel;
	}
}

Transport.prototype.run = function () {
	var canRun = function () {
		console.log(this.fuelLevel);
		console.log(this.fuelRate);
		return this.fuelLevel > this.fuelRate && this.fuelRate > 0;
	}.bind(this);

	var canMove = function () {
		return this.fuelLevel > this.fuelRate;
	}.bind(this);

	if (canRun() && this.turnedOn === false) {
		this.turnedOn = setInterval(function() {
			canMove()
				? this.fuelLevel -= this.fuelRate
				: stop();
		}.bind(this), 1000);
	} else {
		console.log('Обнаружена неисправность.');
		return false;
	}
};

Transport.prototype.stop = function () {
	if (this.turnedOn !== false) {
		clearInterval(this.turnedOn);
		this.turnedOn = false;		
	} else {
		console.log('Уже остановлен')
	}
};
Transport.prototype.getFullName = function() {
	return this.make + ' ' + this.model;
}

var Auto = function() {
	Transport.apply(this, arguments);
	this.wheelDiameter;
	this.bodyStyle;
	this.color;
}
Auto.prototype = Object.create(Transport.prototype);
Auto.prototype.constructor = Auto;
Auto.prototype.getFullName = function() {
	return this.make + ' ' + this.model + ' ' + this.color;
}

var Airplane = function() {
	Transport.apply(this, arguments);
	this.flyingHeight;
	this.span;
	this.range;
}
Airplane.prototype = Object.create(Transport.prototype);
Airplane.prototype.constructor = Airplane;
Airplane.prototype.fly = function () {
	console.log('Летит');
}
Airplane.prototype.run = function () {
	this.canFly = Transport.prototype.run.apply(this, arguments);
	if (this.canFly !== false) {
		this.fly();
	}
}


var Ship = function(shipName) {
	Transport.apply(this, arguments);
	this.shipName = shipName;
	this.port;
	this.speed;
	this.tonnage;
	this.installedPower;
}
Ship.prototype = Transport;
Ship.prototype.constructor = Ship;
Ship.prototype.prototype.getFullName = function() {
	return this.shipName;
}

var Bicycle = function(make, model, size, wheelDiameter) {
	Transport.apply(this, arguments);
	this.size = size;
	this.wheelDiameter = wheelDiameter;
}
Bicycle.prototype = Transport;
Bicycle.prototype.constructor = Bicycle;
Bicycle.prototype.getFullName = function() {
	return this.make + ' ' + this.model + ' ' + this.size + ' ' + this.wheelDiameter + '"';
}
Bicycle.prototype.fuel = function () {
	console.log('Не нужно топливо');
}
Bicycle.prototype.run = function () {
	console.log('Едет...');
}
Bicycle.prototype.stop = function () {
	console.log('Стоит...');
}

var plane1 = new Airplane('Boeing', '737-800');
plane1.flyingHeight = 12500;
plane1.span = 34.32;
plane1.range = 5575;
plane1.fuelCapacity = 26022;
plane1.fuelRate = 5;
plane1.fuel(19000);

var car1 = new Auto('Audi', 'A3');
car1.wheelDiameter = 22;
car1.bodyStyle = 'hatchback';
car1.color = 'black';
car1.fuelCapacity = 120;
car1.fuelRate = 3;
car1.fuel(75);

var ship1 = new Ship('Таймыр');
ship1.port = 'Мурманск';
ship1.speed = '18.5';
ship1.tonnage = '20000';
ship1.installedPower = 'KLT-40M nuclear reactor';

var bike1 = new Bicycle('aist', 'slide 2', '19.5', '29');


plane1.run();
// car1.run();
