import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import seedrandom from 'seedrandom';

export const load: PageServerLoad = async () => {
	const seed = seedrandom(Date.now.toString());

	const wordRecordsCount = await prisma.word.count();

	const randomIndex = Math.floor(seed() * wordRecordsCount);

	const wordOfTheDay = await prisma.word.findFirstOrThrow({
		where: {
			id: randomIndex
		}
	});

	return {
		word: wordOfTheDay
	};
};
