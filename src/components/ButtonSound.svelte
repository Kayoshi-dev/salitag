<script lang="ts">
	let isPlaying = false;

	const read = async () => {
		if (!isPlaying) {
			isPlaying = true;
			const res = await fetch('/api/voicespeech', {
				method: 'POST'
			});
			const audioArrayBuffer = await res.arrayBuffer();
			const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });

			const url = URL.createObjectURL(audioBlob);
			const audio = new Audio(url);
			audio.play();
			audio.addEventListener('ended', () => {
				isPlaying = false;
			});
		}
	};
</script>

<button
	on:click={read}
	class="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-4"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8a5 5 0 0 1 0 8" /><path
			d="M17.7 5a9 9 0 0 1 0 14"
		/><path
			d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"
		/></svg
	>
</button>
