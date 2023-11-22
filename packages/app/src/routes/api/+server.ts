import booter from '$lib/scrapper.js';
import prisma from '$lib/prisma.js';

export async function POST({ request }) {
	const { word, definition, type } = await request.json();

	await prisma.word.create({
		data: {
			word,
			definition,
			type
		}
	});

	console.log(word, 'added !');
	return new Response('added', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function GET() {
	booter();

	return new Response('booting....', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
