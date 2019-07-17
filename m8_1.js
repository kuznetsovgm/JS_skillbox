// Написать программу, которая:
// просит пользователя ввести кусок JavaScript-кода;
// пытается запустить этот код в строгом режиме (strict mode);
// если в коде возникла ошибка, перехватывает ее и выводит соответствующее сообщение.

(function(){
	"use strict";

	function createAlert(msg, status) {
		let alert = document.createElement('div');
		alert.className = 'alert alert-dismissible fade show';
		alert.setAttribute('role', 'alert');

		status == 'success' ? alert.classList.add('alert-success') : alert.classList.add('alert-danger');

		let close = document.createElement('button');
		close.className = 'close';
		close.setAttribute('type', 'button');
		close.setAttribute('data-dismiss', 'alert');
		close.setAttribute('aria-label', 'Close');

		let span = document.createElement('span');
		span.setAttribute('aria-hidden', 'true');
		span.innerHTML = '&times;';

		let text = document.createElement('div');
		text.innerHTML = msg;

		close.appendChild(span);
		alert.appendChild(close);
		alert.appendChild(text); 

		return alert;
	}
	
	var btnExecute = document.querySelector('#btnExecute');
	var container = document.querySelector('.container');

	btnExecute.onclick = function() {
		var code = document.querySelector('#code').value;
		var result = executeCode(code);
		let alert;
		if (result === true) {
			alert = createAlert('Выполнение введённого кода завершено.', 'success');
		} else {
			alert = createAlert('Во введённом JavaScript-коде возникла ошибка: ' + result, 'error');
		}
		container.appendChild(alert);
	};

	window.executeCode = function(jscode) {
		console.log(jscode);
		try {
			eval(jscode);
			console.log('Выполнение введённого кода завершено.');
			return true;
		} catch(err) {
			console.log('Во введённом JavaScript-коде возникла ошибка: ' + err);
			return err;
		}
	}

})();