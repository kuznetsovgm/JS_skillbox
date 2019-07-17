// Написать простое ToDo App — список задач с возможностью добавления новых пунктов 
// и смены статуса готовности каждого пункта (сделано/не сделано). Страница должна состоять из:
// 1. самого списка задач (нумерованный список <ol>, пункты-задачи — <li>);
// 2. поля для ввода названия новой задачи (<input type=“text”);
// 3. кнопки «Добавить».
// При нажатии на кнопку «Добавить» задача добавляется в конец списка в качестве нового пункта <li>.
// Если название задачи не введено, то появляется ошибка (alert или другая реализация) с просьбой заполнить поле.
// Считать значение, введенное в поле, можно при помощи document.querySelector(‘input’).value.
// При клике на любую задачу в списке она помечается как выполненная (становится зачеркнутой, тут пригодится CSS-свойство text-decoration: line-through). При повторном клике зачеркивание исчезает.

(function() {
"use strict";


class TasksList {
	constructor(container) {
		//создаем пустой массив
		this.list = [];
		this.container = container;
		this.container.onclick = function(event) {
			if(/*event.target.classList.contains('title') || */event.target.classList.contains('check')) {
				if (!this.list[event.target.id].isCompleted()) {
					this.list[event.target.id].complete();
				} else {
					this.list[event.target.id].new();
				}
			}
		}.bind(this);
	}

	add(title, text) {
		//создаём новую задачу
		var id = this.list.length;
		var task = new Task(title, text, id);
		//добавляем задачу в массив
		this.list.push(task);
		this.container.appendChild(task.el);
	}

	hide(task) {
		//скрываем задачу
	}

	getTask(index) {
		return this.list[index];
	}
}

var _status = ['new', 'completed'];
class Task {
	constructor(title, text, id) {
		//создаём задачу
		this.title = title;
		this.text = text;
		this.id = id;
		this.status = _status[0];
		this.el = this.createNewElement(title, text, id);
	}

	complete() {
		//помечаем задачу как выполненную
		this.status = _status[1];
		this.el.querySelector('.title').classList.add('completed');
	}

	new() {
		// помечаем задачу как не выполненную
		this.status = _status[0];
		this.el.querySelector('.title').classList.remove('completed');
	}

	isCompleted() {
		return this.status == _status[1];
	}

	createNewElement(title, text, id) {
		var li = document.createElement("li");
		li.className = "task";

		var div = document.createElement("div");
		div.className = "task-title custom-control custom-checkbox";

		var input = document.createElement("input");
		input.setAttribute("type", "checkbox");
		input.className = "custom-control-input check";
		input.id = id;

		var label = document.createElement("label");
		label.className = "custom-control-label title h2 ml-4";
		label.setAttribute("for", id);
		label.appendChild(document.createTextNode(title));

		var btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.className = "close";
		btn.innerHTML = "\xD7";

		var p = document.createElement("p");
		p.className = "task-text";
		p.appendChild(document.createTextNode(text));


		div.appendChild(input);
		div.appendChild(label);
		div.appendChild(btn);

		li.appendChild(div);
		li.appendChild(p);

		return li;
	}

}


var tasks = new TasksList(document.querySelector('#task-list'));
var btnAddNewTask = document.querySelector('#btnAddNewTask');

btnAddNewTask.onclick = function() {
	var newTaskTitle = document.querySelector('#new-task-title').value;
	var newTaskText = document.querySelector('#new-task-text').value;
	if(newTaskTitle == '' && newTaskText == '') {
		return false;
	}
	tasks.add(newTaskTitle, newTaskText);
}

tasks.add('task1', 'text1');
tasks.add('task2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo');
tasks.add('task3 lorem ipsum', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo');
})();
