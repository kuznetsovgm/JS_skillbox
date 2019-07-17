describe('pow', function() {
	describe('Возведение в целую положительную степень', function() {
		it("Возводит 3 в 4 степень", function() {
			assert.equal(pow(3, 4), 81);
		});
		it("Возводит 3 в 1 степень", function() {
			assert.equal(pow(3, 1), 3);
		});
		it("Возводит 2 в 5 степень", function() {
			assert.equal(pow(2, 5), 32);
		});
		it("Возводит -2 в 5 степень", function() {
			assert.equal(pow(-2, 5), -32);
		});
		it("Возводит -3 в 6 степень", function() {
			assert.equal(pow(-3, 6), 729);
		});
	})

	it("Возведение в отрицательную степень", function() {
		assert.isNaN(pow(2, -5));
	});

	it("Возведение в дробную степень", function() {
		assert.isNaN(pow(2, -1.5));
	});

	describe("Возведение в 0 степень", function() {
		it("Возведение 2 в 0 степень", function() {
			assert.equal(pow(2, 0), 1);
		});
		it("Возведение 0 в 0 степень", function() {
			assert.isNaN(pow(0, 0));
		});
	})

})