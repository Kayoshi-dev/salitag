import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const wotdResponse = await fetch(url.origin);
	const wotd = await wotdResponse.json();

	return {
		word: wotd
	};
};
