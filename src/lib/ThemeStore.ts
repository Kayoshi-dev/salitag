import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'system' | 'dark' | 'light';

let defaultTheme: Theme = 'system';

// Could probably be improved but I'm a bit lazy :$
if (browser) {
	const getTheme = localStorage.getItem('theme') as Theme;

	if (getTheme || window.matchMedia('(prefers-color-scheme: dark)').matches) {
		defaultTheme = getTheme || 'dark';
	} else {
		defaultTheme = getTheme || 'light';
	}
}

const theme = writable<Theme>(defaultTheme);

export { theme };
