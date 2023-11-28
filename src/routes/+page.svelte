<script lang="ts">
	import MainTitle from '../components/MainTitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<meta property="og:image" content={`${data.originOG}?word=${data.word.word}`} />
</svelte:head>

<div
	class="h-screen min-w-screen flex flex-col justify-between items-center antialiased bg-slate-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
>
	<nav>
		<MainTitle />
		<h2 class="text-gray-800 dark:text-white italic">One tagalog word per day</h2>
	</nav>

	<main class="flex flex-1 flex-col justify-center">
		<h1
			class="font-extrabold text-transparent leading-normal md:leading-relaxed text-6xl md:text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:text-white capitalize"
		>
			{data.word.word}
		</h1>
		<div class="flex flex-col items-center">
			<h2>{data.word.definition}</h2>
			<i>{data.word.type}</i>
		</div>
	</main>
</div>
