// Написать простое ToDo App — список задач с возможностью добавления новых пунктов 
// и смены статуса готовности каждого пункта (сделано/не сделано). Страница должна состоять из:
// 1. самого списка задач (нумерованный список <ol>, пункты-задачи — <li>);
// 2. поля для ввода названия новой задачи (<input type=“text”);
// 3. кнопки «Добавить».
// При нажатии на кнопку «Добавить» задача добавляется в конец списка в качестве нового пункта <li>.
// Если название задачи не введено, то появляется ошибка (alert или другая реализация) с просьбой заполнить поле.
// Считать значение, введенное в поле, можно при помощи document.querySelector(‘input’).value.
// При клике на любую задачу в списке она помечается как выполненная (становится зачеркнутой, тут пригодится 
// CSS-свойство text-decoration: line-through). При повторном клике зачеркивание исчезает.

(function() {
"use strict";

class TasksList {
	/**
	 * @param  {object} контейнер, в который добавим ещё два контейнера:
	 *  для новых задач и для выполненных
	 * @return {object}
	 */
	constructor(container) {
		//создаем пустой массив, в него будем складывать задачи
		this.list = [];
		this.container = container;
		this.newTasks = document.createElement('div');
		this.newTasks.id = 'newTasks';
		this.newTasks.className = 'new-tasks';
		this.completedTasks = document.createElement('div');
		this.completedTasks.id = 'completedTasks';
		this.container.appendChild(this.newTasks);
		this.container.appendChild(this.completedTasks);
		this.container.onclick = (event) => {
			if(event.target.classList.contains('check')) {
				if (!this.list[event.target.id].isCompleted()) {
					this.getTask(event.target.id).complete();
					this.completedTasks.insertBefore(this.getTask(event.target.id).el, this.completedTasks.firstChild);
				} else {
					this.getTask(event.target.id).new();
					this.newTasks.insertBefore(this.getTask(event.target.id).el, this.newTasks.firstChild);
				}
			}
		};
	}

	/**
	 * проверка задачи на уникальность
	 * @param  {[string]} title [Заголовок]
	 * @param  {[string]} text  [Текст]
	 * @return {[promise]}
	 */
	addNewTask(title, text) {
		let tasks = this.list;
		let duplicate = false;
		for (let i = 0; i < tasks.length; i++) {
			if (title == tasks[i].title && tasks[i].status == _status[0]) {
				duplicate = i;
				break;
			}
		}
		let p = new Promise((resolve, reject) => {
			if (duplicate !== false) {
				return this.createModal('Невыполненная задача с таким заголовком уже существует. Добавить ещё одну?')
					.then(
						result => {
							resolve(this.createTask(title, text));
						},
						reject => false
					);
			} else {
				resolve(this.createTask(title, text));
				result => res;
			}
		});
		return p;
	}


	/**
	 * создание нового объекта Task
	 * 
	 * @param {string} заголовок
	 * @param {string} текст
	 * @return {[int]}
	 */
	createTask(title, text) {
		var id = this.list.length;
		var task = new Task(title, text, id);
		//добавляем задачу в массив
		this.list.push(task);
		this.newTasks.insertBefore(task.el, this.newTasks.firstChild);
		return id;
	}

	getTask(index) {
		return this.list[index];
	}

	createModal(text) {
		var modal = document.createElement('div');
		modal.className = 'modal';
		modal.style.backgroundColor = '#12141bb3';
		var modalDialog = document.createElement('div');
		modalDialog.className = 'modal-dialog modal-dialog-centered';
		var modalContent = document.createElement('div');
		modalContent.className = 'modal-content';
		var modalBody = document.createElement('div');
		modalBody.className = 'modal-body';
		modalBody.innerHTML = text;
		var modalFooter = document.createElement('div');
		modalFooter.className = 'modal-footer';
		var btnSave = document.createElement('button');
		btnSave.className = 'btn btn-primary';
		btnSave.innerHTML = 'Добавить';
		var btnCancel = document.createElement('button');
		btnCancel.className = 'btn btn-secondary';
		btnCancel.innerHTML = 'Отмена';

		modal.appendChild(modalDialog);
		modalDialog.appendChild(modalContent);
		modalContent.appendChild(modalBody);
		modalContent.appendChild(modalFooter);
		modalFooter.appendChild(btnCancel);
		modalFooter.appendChild(btnSave);

		document.querySelector('body').appendChild(modal);
		modal.style.display = 'block';	

		let p = new Promise((resolve, reject) => {
			btnSave.onclick = function() {
				modal.remove();
				resolve(true);
			}
			btnCancel.onclick = function() {
				modal.remove();
				reject(false);
			}
		})
		return p;
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
		this.el = this.createNewElement(this);
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


// Добавил деструктуризацию
	createNewElement({title, text, id}) {
		var li = document.createElement("li");
		li.className = "task col-xs-12 col-lg-6 float-left";

		var div = document.createElement("div");
		div.className = "task-title custom-control custom-checkbox";

		var input = document.createElement("input");
		input.setAttribute("type", "checkbox");
		input.className = "custom-control-input check";
		input.id = id;

		var label = document.createElement("label");
		label.className = "custom-control-label title h4 ml-4";
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
		// div.appendChild(btn);

		li.appendChild(div);
		li.appendChild(p);

		return li;
	}

}

var tasks = new TasksList(document.querySelector('#task-list'));
var btnAddNewTask = document.querySelector('#btnAddNewTask');

btnAddNewTask.onclick = () => {
	var newTaskTitle = document.querySelector('#new-task-title');
	var newTaskText = document.querySelector('#new-task-text');
	if(newTaskTitle.value == '' || newTaskText.value == '') {
		if (newTaskTitle.value == '') {
			newTaskTitle.classList.add('danger');
			newTaskTitle.setAttribute("placeholder", 'Это поле обязательно для заполненния');
			newTaskTitle.onfocus = function() {
				newTaskTitle.classList.remove('danger');
				newTaskTitle.removeAttribute("placeholder");
			}
		}
		if (newTaskText.value == '') {
			newTaskText.classList.add('danger');
			newTaskText.setAttribute("placeholder", 'Это поле обязательно для заполненния');
			newTaskText.onfocus = function() {
				newTaskText.classList.remove('danger');
				newTaskText.removeAttribute("placeholder");
			}
		}
		return false;
	}
	tasks.addNewTask(newTaskTitle.value.trim(), newTaskText.value.trim())
		.then(() => {	
			newTaskTitle.value = newTaskText.value = '';
		});
}

tasks.addNewTask('одиннадцатиклассница - делопроизводительница', 'Купила самогонный аппарат и пососала сушку.');
tasks.addNewTask('Похвалить себя', 'Погладить себя по голове.');
tasks.addNewTask('Добавить новую задачу', `Заполнить поле "Заголовок задачи", желательно 1 - 2 словами. В поле "Текст задачи" описать суть задачи более подробно.`); //попробовал backtick
tasks.addNewTask('Выполнить первую задачу', 'Щелкнуть на заголовок, чтобы отметить задачу как выполненную.');
})();
