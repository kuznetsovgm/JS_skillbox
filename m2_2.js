//определение високосного года

initialValue = 1900;
finalValue = 2116;

for (year = initialValue; year <= finalValue; year++) {
	if (!(year % 4) && (year % 100) || !(year % 400) ) {
		console.log(year + " - високосный");
	}
}