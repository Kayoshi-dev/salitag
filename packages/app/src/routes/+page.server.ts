import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import seedrandom from 'seedrandom';

export const load: PageServerLoad = async () => {
	const currentDate = new Date().toJSON().slice(0, 10);
	const seed = seedrandom(currentDate);

	const wordRecordsCount = await prisma.word.count();

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

	return {
		word: wordOfTheDay
	};
};
