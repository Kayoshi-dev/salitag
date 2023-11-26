<script lang="ts">
	import Subtitle from '../components/Subtitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<meta property="og:image" content={data.originOG} />
</svelte:head>

<div class="min-h-screen min-w-screen flex flex-col justify-center items-center antialiased">
	<h1 class="text-4xl">Salitag</h1>
	<Subtitle />

	<h1
		class="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 capitalize"
	>
		{data.word.word}
	</h1>
	<h2>{data.word.definition}</h2>
	<h3>{data.word.type}</h3>
</div>
