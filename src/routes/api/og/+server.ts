import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';

export async function GET({ url }) {
	try {
		const fontFile = await fetch(url.origin + '/fonts/Inter-Bold.ttf');
		const fontData: ArrayBuffer = await fontFile.arrayBuffer();

		const wotd: string | undefined = url.searchParams.get('word') ?? undefined;

		// The PH flag might not be displayed when testing in localhost
		const svg = await satori(
			html`<div tw="w-full h-full flex flex-col bg-gray-50">
				<div tw="text-4xl font-bold pl-7 pt-5">🇵🇭 Salitag</div>
				<div tw="w-full h-85 justify-center flex flex-col items-center ">
					<span tw="text-4xl font-bold">Today's word :</span>
					<span tw="capitalize text-7xl font-bold text-blue-500">${wotd}</span>
				</div>
				<div tw="flex justify-center font-bold text-gray-600">
					Learn one word of Tagalog per day on salitag.vercel.app
				</div>
			</div>`,
			{
				height: 512,
				width: 1024,
				fonts: [
					{
						weight: 400,
						style: 'normal',
						name: 'Inter regular',
						data: fontData
					}
				],
				graphemeImages: {
					'🇵🇭': url.origin + '/1f1f5-1f1ed.svg'
				}
			}
		);

		const png = await sharp(Buffer.from(svg)).png().toFormat('png').toBuffer();

		return new Response(png, {
			headers: {
				'Content-Type': 'image/png'
			}
		});
	} catch (e) {
		console.error(e);
	}
}
