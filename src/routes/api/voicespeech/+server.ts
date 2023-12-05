import type { Word } from '@prisma/client';

let arrayBuffer: ArrayBuffer;

export async function POST({ url }) {
	const resWord = await fetch(`${url.origin}/api`);
	const wotd: Word = await resWord.json();

	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('xi-api-key', process.env.VOICE_SPEECH_API_KEY!);

	const options = {
		method: 'POST',
		headers,
		body: `{"text":"${wotd.word}","voice_settings":{"similarity_boost":0.75,"stability":0.5,"use_speaker_boost":true},"model_id":"eleven_multilingual_v2"}`
	};

	if (!arrayBuffer) {
		const res = await fetch(
			'https://api.elevenlabs.io/v1/text-to-speech/LcfcDJNUP1GQjkzn1xUU',
			options
		);
		const blob = await res.blob();
		arrayBuffer = await blob.arrayBuffer();
	}

	return new Response(arrayBuffer, {
		headers: {
			'Content-Type': 'application/octet-stream'
		}
	});
}
