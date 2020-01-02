(function() {
	"use strict";

class Translator {
	constructor(key) {
		this.key = key;
	};

	getKey() {
		return this.key;
	};

	getAvailableLangs(lang = 'ru') {
		let url = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + this.getKey() + '&ui=' + lang;
		return window.fetch(url)
			.then(response => response.json())
			.then(res => res.langs);
	};

	getTranslateText(text, lang) {
		let url = `https://translate.yandex.net/api/v1.5/tr.json/translate`;
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

	detectLang(text) {
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

		setLangs = function(event) {
			let changedLang = event.target.attributes.code.value;
			let lang = event.target.selectedOptions[0].attributes['code'].value;
			this[changedLang] = lang;
			this.translateText();
		}.bind(this);

		translateText = function(event) {
			debugger;
			let lang = this.langOne == 'auto' ? this.langTwo : this.langOne + '-' + this.langTwo;
			let text = encodeURIComponent(this.textLangOne.value);
			let a = this.getTranslateText(text, lang)
				.then(function(text) {
					this.textLangTwo.value = text[0];
				}.bind(this));
		}.bind(this);
	
}

var text = new textEditor(document.querySelector('#myContainer'), 'trnsl\.1\.1\.20191029T185200Z\.73b33c707596709b\.5914bd63675074e950a02c8e03199074fa647bbe');
	
})();
