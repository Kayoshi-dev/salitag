<script lang="ts">
	export let word: string;
</script>

<!-- Inspired by https://cruip.com/create-an-animated-gradient-text-with-tailwind-css -->
<h1
	class="font-extrabold cursor-pointer bg-clip-text text-transparent text-center leading-normal md:leading-relaxed text-4xl sm:text-6xl md:text-8xl bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.600),theme(colors.blue.400),theme(colors.fuchsia.400),theme(colors.blue.400),theme(colors.cyan.500),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient capitalize"
>
	{word}
</h1>
