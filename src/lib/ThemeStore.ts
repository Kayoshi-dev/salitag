import { writable } from 'svelte/store';

type Theme = 'system' | 'dark' | 'light';

const theme = writable<Theme>('system');

export { theme };
