import { writable } from 'svelte/store';

const browser = typeof window !== 'undefined';

export function createLocalStore(key, initialValue) {
	const storedValue = browser ? localStorage.getItem(key) : null;
	const data = storedValue ? JSON.parse(storedValue) : initialValue;
	const store = writable(data);

	store.subscribe(value => {
		if (browser) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});

	function reset() {
		if (browser) {
			localStorage.removeItem(key);
		}
		store.set(initialValue);
	}

	return {
		...store,
		reset
	};
}
