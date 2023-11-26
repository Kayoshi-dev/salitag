import satori from 'satori';
import { html } from 'satori-html';

export async function GET({ url }) {
	const fontFile = await fetch(url.origin + '/fonts/Inter-Bold.ttf');
	const fontData: ArrayBuffer = await fontFile.arrayBuffer();

	console.log(url.origin);
	const wotdResponse = await fetch(url.origin + '/api');
	const wotd = await wotdResponse.json();

	const image = await satori(
		html`<div
			tw="w-full h-full flex justify-center items-center capitalize text-9xl font-bold text-blue-500"
		>
			${wotd.word}
		</div>`,
		{
			height: 400,
			width: 800,
			fonts: [
				{
					weight: 400,
					style: 'normal',
					name: 'Inter regular',
					data: fontData
				}
			]
		}
	);

	return new Response(image);
}
