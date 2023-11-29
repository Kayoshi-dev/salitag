<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex flex-col justify-center items-center h-screen">
	<h1 class="font-extrabold text-6xl md:text-8xl">
		{$page.status}
	</h1>

	{#if $page.error}
		<h2 class="text-3xl md:text-5xl text-slate-800 italic">{$page.error.message}</h2>
	{/if}
</main>
