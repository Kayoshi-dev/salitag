import type { Word } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const wotdResponse = await fetch(url.origin + '/api');
	const wotd: Word = await wotdResponse.json();

	const originOG = url.origin + '/api/og';

	return {
		word: wotd,
		originOG
	};
};
