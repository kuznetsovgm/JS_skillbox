// destructuring
const user = {
	name: 'user',
	age: '25',
	lastName: 'lastUser',
}
const {name, lastName, age} = user; // теперь есть переменные name, lastName, age со значениями из user

// rest parameters
function function_name(a, ...parameters) {
	console.log(a);
	console.log(parameters);
}
Math.max(...[1, 2, 3, 4,])

// backtick ``
const var1;
const str = 
`Многострочная
строка c 
${var1}`;

// arrow function
// сохраняет контекст того места, где была создана
const foo = (x, y, z) => x * x; // однострочная
// многострочная без параметров
const foo1 = () => {
	let a = 1, b = 2;
	return a + b;
};
// с деструктуризированными параметрами
const obj = {
	a: 1,
	b: 'str',
};
const foo2 = ({a, b}) => {
	return a + b;
};
foo(obj);