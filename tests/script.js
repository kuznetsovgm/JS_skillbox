"use strict"

function pow(x, n) {
	if (n < 0 || n % 1 !== 0 || x === 0) return NaN;
	var result = 1;

	for (var i = 1; i <= n; i++) {
		result *= x;
	}

	return result;
}
