export const increment = (x, min, max) => (x === max ? min : x + 1);
export const decrement = (x, min, max) => (x === min ? max : x - 1);
export const enforce = (x, min, max) => {
	if (typeof x != 'number') return max;
	if (!Number.isInteger(x)) return max;
	if (x < min || x > max) return max;
	return x;
};
