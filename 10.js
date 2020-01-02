// Разработать простой текстовый редактор с возможностью сохранения контента в LocalStorage.
// Страница должна состоять из:
// Блока с текстом
// Кнопки «Редактировать»
// Кнопок «Сохранить» и «Отмена» (по умолчанию неактивных — disabled)
// Механика работы страницы:
// при первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой);
// при нажатии на кнопку «Редактировать» блок с текстом становится редактируемым (contenteditable=true), кнопки «Сохранить» и «Отмена» становятся активными, а сама кнопка «Редактировать» — неактивной;
// при нажатии на кнопку «Сохранить» содержимое блока с текстом сохраняется в LocalStorage, а режим редактирования отключается (кнопки возвращаются в исходное состояние);
// при нажатии на кнопку «Отмена» содержимое блока с текстом заменяется на последний сохраненный вариант из LocalStorage, режим редактирования отключается;
// При следующих перезагрузках страницы содержимое блока с текстом автоматически подтягивается из LocalStorage (последний сохраненный вариант).
// 


(function() {
	"use strict";

	window.textEditable = function(obj) {
		return new Editor(obj);
	};


	class Editor {
		constructor(obj) {
			this.storage = this.loadStorage();

			this.editor = this.createElements(obj);
			this.id = obj.id;

			this.setText();
		}

		createElements = function(obj) {
			this.container = document.createElement('div');
			this.container.classList.add('textContainer');

			this.menu = document.createElement('div');
			this.menu.classList.add('menu', 'text-right');
			this.btnEdit = document.createElement('button');
			this.btnEdit.innerText = ' Редактировать';
			this.btnEdit.classList.add('btn', 'oi', 'm-1');
			this.btnEdit.setAttribute('data-glyph', 'pencil');
			this.btnSave = document.createElement('button');
			this.btnSave.innerText = ' Сохранить';
			this.btnSave.classList.add('btn', 'oi', 'm-1');
			this.btnSave.setAttribute('data-glyph', 'check');
			this.btnSave.setAttribute('disabled', 'disabled');
			this.btnCancel = document.createElement('button');
			this.btnCancel.innerText = ' Отменить';
			this.btnCancel.classList.add('btn', 'oi', 'm-1');
			this.btnCancel.setAttribute('disabled', 'disabled');
			this.btnCancel.setAttribute('data-glyph', 'ban');

			this.editorMenu = document.createElement('div');
			this.editorMenu.classList.add('editor-menu', 'text-left');
			this.colorSelect = document.createElement('select');
			this.colorSelect.classList.add('custom-select', 'text-left');
			this.colorSelect.style.width = 'unset';
			this.colorSelect.setAttribute('disabled', 'disabled');
			let colors = {
				"black": 'Чёрный',
				"red": 'Красный',
				"blue": 'Синий',
				"green": 'Зеленый',
			};
			for(let key in colors) {
				let option = document.createElement('option');
				option.innerText = colors[key];
				option.setAttribute('value', key);
				this.colorSelect.appendChild(option);
			}

			this.btnBold = document.createElement('button');
			this.btnBold.classList.add('btn', 'oi', 'ml-2');
			this.btnBold.setAttribute('data-glyph', 'bold');
			this.btnBold.setAttribute('disabled', 'disabled');
			this.btnItalic = document.createElement('button');
			this.btnItalic.classList.add('btn', 'oi', 'ml-2');
			this.btnItalic.setAttribute('data-glyph', 'italic');
			this.btnItalic.setAttribute('disabled', 'disabled');
			this.editorMenu.appendChild(this.colorSelect);
			this.editorMenu.appendChild(this.btnBold);
			this.editorMenu.appendChild(this.btnItalic);

			this.select = document.createElement('select');
			this.select.classList.add('custom-select');
			this.setSelect();

			this.text = document.createElement('div');
			this.text.classList.add('rounded', 'border', 'p-2', 'my-3');
			this.text.setAttribute('contenteditable', false);

			this.container.appendChild(this.menu);
			this.menu.appendChild(this.select);
			this.menu.appendChild(this.btnEdit);
			this.menu.appendChild(this.btnSave);
			this.menu.appendChild(this.btnCancel);
			this.menu.appendChild(this.editorMenu);
			this.container.appendChild(this.text);

			obj.appendChild(this.container);

			this.btnEdit.onclick = this.btnEditClick;
			this.btnSave.onclick = this.btnSaveClick;
			this.btnCancel.onclick = this.btnCancelClick;
			this.select.onchange = this.changeSelect;
			this.colorSelect.onchange = function() { this.formatText('forecolor', this.colorSelect[this.colorSelect.selectedIndex].value); }.bind(this);
			this.btnBold.onclick = function() { this.formatText('bold'); }.bind(this);
			this.btnItalic.onclick = function() { this.formatText('italic'); }.bind(this);

			return obj;
		}

		formatText = function(command, value) {
			if(this.text.isContentEditable) {
				document.execCommand(command, false, value);
				this.text.focus();
			}
		}.bind(this)

		btnEditClick = function() {
			if(!this.text.isContentEditable) {
				this.btnSave.removeAttribute('disabled');
				this.btnCancel.removeAttribute('disabled');
				this.colorSelect.removeAttribute('disabled');
				this.btnBold.removeAttribute('disabled');
				this.btnItalic.removeAttribute('disabled');
				this.btnEdit.setAttribute('disabled', 'disabled');
				this.text.setAttribute('contenteditable', true);
				this.isEditing = true;

			}
		}.bind(this)

		btnSaveClick = function() {
			if(this.text.isContentEditable) {
				this.btnSave.setAttribute('disabled', 'disabled');
				this.btnCancel.setAttribute('disabled', 'disabled');
				this.colorSelect.setAttribute('disabled', 'disabled');
				this.btnBold.setAttribute('disabled', 'disabled');
				this.btnItalic.setAttribute('disabled', 'disabled');
				this.btnEdit.removeAttribute('disabled');
				this.text.setAttribute('contenteditable', false);

				this.addToStorage();
				this.setSelect();
			}
		}.bind(this)

		btnCancelClick = function() {
			if(this.text.isContentEditable) {
				this.btnSave.setAttribute('disabled', 'disabled');
				this.btnCancel.setAttribute('disabled', 'disabled');
				this.colorSelect.setAttribute('disabled', 'disabled');
				this.btnBold.setAttribute('disabled', 'disabled');
				this.btnItalic.setAttribute('disabled', 'disabled');
				this.btnEdit.removeAttribute('disabled');
				this.text.setAttribute('contenteditable', false);

				this.setText();
			}
		}.bind(this)

		setText = function(key) {
			let length = Object.keys(this.storage).length;
			if (length) {
				//если передали ключ - устанавливаем его, иначе последний
				this.text.innerHTML = typeof(key) !== "undefined" ? this.storage[key].text : this.storage[length - 1].text;
			} else {
				this.text.innerHTML = 'Нажмите кнопку "Редактировать", чтобы вписать сюда свой текст.<br>Нажатие на кнопку "Сохранить" - сохранит Ваш текст, "Отмена" - вернет к предыдущему сохраненному варианту.';
			}
		}

		setSelect = function() {
			this.select.innerHTML = '';
			let length = Object.keys(this.storage).length;
			let i = 0;
			for (i; i < length; i++) {
				let option = document.createElement('option');
				let date = new Date(this.storage[i].date);
				option.innerText = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
				this.select.appendChild(option);
			}
			this.select.selectedIndex = length - 1;
		}

		changeSelect = function() {
			this.setText(this.select.selectedIndex);
		}.bind(this)

		loadStorage = function() {
			let storage;
			if (storage = localStorage.getItem('editor')) {
				return JSON.parse(storage);
			} else {
				return {};
			}
		}

		addToStorage = function() {
			let date = Date.now();
			let item = {
				date: date,
				container: this.id,
				text: this.text.innerHTML,
			}
			let length = Object.keys(this.storage).length;
			let textChanged = length ? this.storage[length - 1].text != item.text : true;
			if (length == 0 || textChanged) {
				this.storage[length] = item;
				localStorage.setItem('editor', JSON.stringify(this.storage));
			}
		}

	}
	
	textEditable(document.querySelector('#myContainer'));
})();
