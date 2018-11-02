import App from './App.html';

import { Store } from 'svelte/store.js';

const store = new Store({
	name: 'world'
});


console.log(store)
