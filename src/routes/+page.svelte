<script lang="ts">
	import ButtonSound from '../components/ButtonSound.svelte';
	import Word from '../components/Word.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<meta property="og:image" content={`${data.originOG}?word=${data.word.word}`} />
</svelte:head>

<main class="flex flex-col justify-center h-screen">
	<Word word={data.word.word} />
	<div class="flex justify-center">
		<ButtonSound />
	</div>

	<div class="flex flex-col items-center">
		<h2 class="dark:text-white">{data.word.definition}</h2>
		<i class="dark:text-white">{data.word.type}</i>
	</div>
</main>
