// import prisma from '$lib/prisma.js';

import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';
import seedrandom from 'seedrandom';

// export async function POST({ request }) {
// 	const { word, definition, type } = await request.json();

// 	await prisma.word.create({
// 		data: {
// 			word,
// 			definition,
// 			type
// 		}
// 	});

// 	console.log(word, 'added !');
// 	return new Response('added', {
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	});
// }

export async function GET() {
	const currentDate = new Date().toJSON().slice(0, 10);
	const seed = seedrandom(currentDate);

	const wordRecordsCount = await prisma.word.count({
		where: {
			definition: {
				not: null
			}
		}
	});

	const randomIndex = Math.floor(seed() * wordRecordsCount);

	const wordOfTheDay = await prisma.word.findFirstOrThrow({
		where: {
			id: randomIndex,
			definition: {
				not: null
			}
		},
		orderBy: {
			id: 'asc'
		}
	});

	return json(wordOfTheDay, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
