$(function() {
	$('.ball').on('click', function (ev) {
  		$(this).animate(
	  		{
	  			ballRotation: getNewRotate(),
	  			top: getNewY(),
	  			left: getNewX(),
	  		},
	  		{
	  			duration: 500,
	  			specialEasing: {
	  				top: 'easeOutQuad',
	  				left: 'easeOutQuad',
	  			},
	  			step: function(now, fx) {
	  				// Поворот мяча
	  				if (fx.prop === 'ballRotation') {
	  					$(this).css('transform','rotate(' + now + 'deg)');
	  				}
	  			},
	  			complete: function() {
	  				let gateHeight = $('.field').height() / 7;
	  				let gateTop = $('.field').offset().top + ($('.field').height() - gateHeight) / 2;
	  				let gateBottom = gateTop + gateHeight;
	  				let ballPosition = $('.ball').offset().top + $('.ball').height() / 2;
	  				if (ballPosition > gateTop && ballPosition < gateBottom) {
	  					$('.goal').fadeIn('fast', function() {
	  						$(this).fadeOut(1200);
	  					});
	  					side ? scoreRight() : scoreLeft();
  						resetBall();
	  				}
	  			},
	  		}
	  	);
	});

	function getNewY() {
		let minValue = $('.field').offset().top;
		let maxValue = $('.field').height() + minValue - $('.ball').height();
		return Math.floor(Math.random() * ((maxValue + 1) - minValue) + minValue);
	};

	function getNewX() {
		let offsetField = side ? -15 : 15;
		let newX = side * ($('.field').width() - $('.ball').width()) + $('.field').offset().left + offsetField;
		side = side ? 0 : 1;
		return newX;
	};

	function getNewRotate() {
		let rotate = Math.floor(Math.random() * 20 - 10) * 1000;
		return rotate;
	};

	// добавил easing
	$.extend($.easing, {
		easeOutQuad: function(x) {
			return 1 - ( 1 - x ) * ( 1 - x );
		},
		ballEasing: function(x) {
			return (x - 0.5) * (x - 0.5) * 4;
		},
	});

	function resetBall() {
		$('.ball').css({
			width: '15vw',
		    top: '-5vw',
		    left: (Math.floor(Math.random() * (80) + 10)) + 'vw',
		}, 500);
		$('.ball').animate({
			width: '7vw',
		    top: '43.8%',
		    left: '46.4vw',
		}, 
		{
			duration: 500,
			specialEasing: {
				top: 'linear',	
				left: 'linear',	
				width: 'ballEasing',
			},
		});
	};

	function score(side) {
		let score = 0;
		let selector = side ? '.scoreRight' : '.scoreLeft';
		return function() {
			console.log(score);
			$(selector).animate({
				top: '4vw',
				opacity: '0',
			}, {
				duration: 300,
				complete: function() {
					$(selector)
					.html(++score)
					.css({
						top: '-4vw',
					})
					.animate({
						top: 0,
						opacity: 1,
					}, 300)
				}
			})
		};
	};

	// 0 - левая
	// 1 - правая
	var side = Math.round(Math.random());
	let scoreLeft = score(0);
	let scoreRight = score(1);
	resetBall();

});