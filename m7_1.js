/*
Создайте иерархию сущностей (конструкторов, из которых можно создать экземпляры объектов):

• базовый конструктор «Транспортное средство» с общими для всех транспортных 
	средств свойствами и методами (на ваше усмотрение)
• дочерние конструкторы: автомобиль, самолёт, корабль, которые наследуют 
	общие свойства и методы от родительского
• продемонстрируйте, как дочерние сущности могут переопределять родительские 
	свойства и методы в соответствии со своим собственным поведением

ES6
*/

"use strict"

class Transport {
	constructor(make, model) {
		this.make = make;
		this.model = model;
		this.fuelLevel = 0;
		this.turnedOn = false;
	}

	fuel(level) {
		if (arguments.length > 0) {
			this.fuelLevel = level;
		} else {
			return this.fuelLevel;
		}
	}

	run() {
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
	}

	stop() {
		if (this.turnedOn !== false) {
			clearInterval(this.turnedOn);
			this.turnedOn = false;		
		} else {
			console.log('Уже остановлен')
		}
	}

	getFullName()  {
		return this.make + ' ' + this.model;
	}
}

class Auto extends Transport {
 	getFullName() {
		return this.make + ' ' + this.model + ' ' + this.color;
	}
}

class Airplane extends Transport {
	fly() {
		console.log('Летит');
	}

	run() {
		this.canFly = super.run();
		if (this.canFly !== false) {
			this.fly();
		}
	}
}

class Ship extends Transport {
	constructor(name) {
		super();
		this.shipName = name;
	}
	getFullName() {
		return this.shipName;
	}
}

class Bicycle extends Transport {
	constructor(make, model, size, wheelDiameter) {
		super(make, model);
		this.size = size;
		this.wheelDiameter = wheelDiameter;
	}

	getFullName() {
		return this.make + ' ' + this.model + ' ' + this.size + ' ' + this.wheelDiameter + '"';
	}

	fuel() {
		console.log('Не нужно топливо');
	}

	run() {
		console.log('Едет');
	}

	stop() {
		console.log('Стооит');
	}
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