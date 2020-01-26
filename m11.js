(function() {
	"use strict";


class Translator {
	constructor(key) {
		this.key = key;
	};

	getKey = () => this.key;

	/**
	 * Функция выполняет запрос к API яндекс переводчика для получения списка доступных для перевода языков.
	 * @param  {string} строка, в которой указываем, на каком языке получим список языков,
	 * например, для 'ru' получим список языков на русском.
	 * @return {Promise} с объектов со списком языков ({'ru': 'Русский',}). 
	 *
	 */
	getAvailableLangs(lang = 'ru') {
		let url = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${this.getKey()}&ui=${lang}`;
		return window.fetch(url)
			.then(response => response.json())
			.then(res => res.langs);
	};

	/**
	 * Функция выполняет запрос к API яндекс переводчика для получения перевода.
	 * @param1  {string} строка, с текстом, который надо перевести,
	 * @param2  {string} строка, в которой указываем направление перевода
	 * 	в виде 'ru-en' или, для автоматического определения языка просто 'en'
	 * 
	 * @return {Promise} с объектом с переводом. 
	 *
	 */
	getTranslateText(text, lang) {
		let url = `https://translate.yandex.net/api/v1.5/tr.json/translate`;
		text = encodeURIComponent(text);
		let promise = window.fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `key=${this.getKey()}&text=${text}&lang=${lang}&format=plain`,
			})
			.then(response => response.status == 200 ? response.json() : null)
			.then(res => res.text);
		return promise;
	};

	/**
	 * Функция выполняет запрос к API яндекс переводчика для определения языка.
	 * @param1  {string} строка, с текстом, язык которого надо определить,
	 * 
	 * @return {Promise} с объектом с предпологаемым языком. 
	 *
	 */
	detectLang(text) {
		text = encodeURIComponent(text);
		let url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${this.getKey()}&text=${text}`;
		return window.fetch(url)
			.then(response => response.status == 200 ? response.json() : null)
			.then(res => res.lang);
	};
};

class textEditor extends Translator {
		constructor(obj, key) {
			super(key);
			this.textArea = this.createElements(obj);
			this.id = obj.id;
		};

		/**
		 * Создаем интерфейс и задаем обработчики событий
		 *
		 */
		createElements = function(obj) {
			this.container = document.createElement('div');
			this.container.classList.add('textContainer');

			
			this.selectLangOne = document.createElement('select');
			this.selectLangOne.classList.add('custom-select', 'col-sm-5', 'col-xs-12');
			this.selectLangOne.setAttribute('code', 'langOne');
			this.selectLangOne.onchange = this.setLangs;
			this.langOne = 'auto';
			this.selectLangOne = this.setSelect(this.selectLangOne, this.langOne);
			this.selectLangTwo = document.createElement('select');
			this.selectLangTwo.classList.add('custom-select', 'col-sm-5', 'col-xs-12', 'offset-sm-2');
			this.selectLangTwo.setAttribute('code', 'langTwo');
			this.selectLangTwo.onchange = this.setLangs;
			this.langTwo = 'ru';
			this.selectLangTwo = this.setSelect(this.selectLangTwo, this.langTwo);

			this.textLangOne = document.createElement('textarea');
			this.textLangOne.classList.add('custom-textarea', 'rounded', 'border', 'p-2', 'my-3', 'col-sm-5', 'col-xs-12');
			this.textLangOne.onkeyup = this.translateText;
			this.textLangTwo = document.createElement('textarea');
			this.textLangTwo.classList.add('custom-textarea', 'rounded', 'border', 'p-2', 'my-3', 'col-sm-5', 'col-xs-12', 'offset-sm-2');

			this.container.appendChild(this.selectLangOne);
			this.container.appendChild(this.selectLangTwo);
			this.container.appendChild(this.textLangOne);
			this.container.appendChild(this.textLangTwo);

			obj.appendChild(this.container);

			return obj;
		};


		/**
		 * Устанавливаем в селекты доступные для перевода языки
		 * @param1  {Object} селект, в который устанавливаем значения,
		 * @param2  {string} язык, который будет установлен "по умолчанию"
		 *
		 */
		setSelect = function(select, lang = 'ru') {
			select.innerHTML = '';
			this.langs = this.getAvailableLangs().then(function(langs) {
				let length = Object.keys(langs).length;
				if (lang == 'auto') {
					let option = document.createElement('option');
					option.innerText = 'Автоопределение';
					option.setAttribute('code', lang);
					select.appendChild(option);
					select.selectedIndex = option.index;
				}
				for (let key in langs) {
					let option = document.createElement('option');
					option.innerText = langs[key];
					option.setAttribute('code', key);
					select.appendChild(option);
					if (key == lang) {
						select.selectedIndex = option.index;
					}
				}
			}.bind(this));
			return select;
		};

		/**
		 * Обработчик события смены языка в селекте
		 *
		 */
		setLangs = (event) => {
			let changedLang = event.target.attributes.code.value;
			let lang = event.target.selectedOptions[0].attributes['code'].value;
			this[changedLang] = lang;
			this.translateText();
		};


		/**
		 * Обработчик события ввода текста для перевода
		 *
		 */
		translateText = function(event) {
			let lang = this.langOne == 'auto' ? this.langTwo : this.langOne + '-' + this.langTwo;
			let a = this.getTranslateText(this.textLangOne.value, lang)
				.then(function(text) {
					this.textLangTwo.value = text[0];
				}.bind(this));
		}.bind(this);
	
}

var text = new textEditor(document.querySelector('#myContainer'), 'trnsl\.1\.1\.20191029T185200Z\.73b33c707596709b\.5914bd63675074e950a02c8e03199074fa647bbe');
	
})();
