<script lang="ts">
	import { blur } from 'svelte/transition';

	let isHovering = false;
</script>

<h1
	class="text-4xl relative h-10 font-bold tracking-tight text-black dark:text-white"
	on:mouseover={() => (isHovering = true)}
	on:focus={() => {}}
	on:mouseleave={() => (isHovering = false)}
>
	<a href="https://salitag.fr"
		>{#if isHovering}
			<span transition:blur class="absolute w-full flex justify-center font-notoSansTagalog"
				>ᜐᜎᜒᜆᜄ᜴
			</span>
		{:else}
			<span transition:blur class="absolute w-full flex justify-center">Salitag</span>
		{/if}
	</a>
</h1>

<style>
	@font-face {
		font-family: 'NotoSansTagalog';
		src: local('NotoSansTagalog'), local('NotoSansTagalog'),
			url('/fonts/NotoSansTagalog-Regular.ttf');
		font-weight: normal;
		font-display: swap;
	}
</style>
