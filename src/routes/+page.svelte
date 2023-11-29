<script lang="ts">
	import Word from '../components/Word.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<meta property="og:image" content={`${data.originOG}?word=${data.word.word}`} />
</svelte:head>

<main class="flex flex-1 flex-col justify-center">
	<Word word={data.word.word} />
	<div class="flex flex-col items-center">
		<h2>{data.word.definition}</h2>
		<i>{data.word.type}</i>
	</div>
</main>
