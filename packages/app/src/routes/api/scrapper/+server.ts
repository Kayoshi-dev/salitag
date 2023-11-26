import booter from '$lib/scrapper.js';

export async function GET() {
	booter();

	return new Response('booting....', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
