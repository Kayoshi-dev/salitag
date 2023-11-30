<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import MainTitle from '../components/MainTitle.svelte';
	import ThemeSwitcher from '../components/ThemeSwitcher.svelte';
	import { theme } from '$lib/ThemeStore';

	theme.subscribe(() => {
		handleSwitchDarkMode();
	});

	function handleSwitchDarkMode() {
		if (browser) {
			if ($theme === 'dark') {
				document.documentElement.classList.add('dark');
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}
		}
	}
</script>

<div
	class="h-screen min-w-screen flex flex-col items-center antialiased bg-slate-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
>
	<nav class="fixed">
		<div class="flex flex-col">
			<MainTitle />
			<h2 class="text-gray-800 dark:text-slate-200 italic pb-3">One tagalog word per day</h2>
			<ThemeSwitcher />
		</div>
	</nav>

	<slot />
</div>
