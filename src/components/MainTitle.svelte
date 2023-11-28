<script lang="ts">
	import { blur } from 'svelte/transition';

	let isHovering = false;
</script>

<h1
	class="text-4xl relative h-10 font-bold tracking-tight"
	on:mouseover={() => (isHovering = true)}
	on:focus={() => {}}
	on:mouseleave={() => (isHovering = false)}
>
	<a href="https://salitag.vercel.app/"
		>{#if isHovering}
			<span transition:blur class="absolute w-full flex justify-center">ᜐᜎᜒᜆᜄ᜴ </span>
		{:else}
			<span transition:blur class="absolute w-full flex justify-center">Salitag</span>
		{/if}
	</a>
</h1>
