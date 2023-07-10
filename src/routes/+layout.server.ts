import type { LayoutServerLoad } from './$types';

export const load = async () => {
	return {
		one: Promise.resolve([
			{
				src: '800.webp',
				alt: '0'
			},
			{
				src: '800.webp',
				alt: '1'
			},
			{
				src: '800.webp',
				alt: '2'
			},
			{
				src: '800.webp',
				alt: '3'
			},
			{
				src: '800.webp',
				alt: '4'
			},
			{
				src: '800.webp',
				alt: '5'
			}
		]),
		two: Promise.resolve([
			{
				src: '800.webp',
				alt: '6'
			},
			{
				src: '800.webp',
				alt: '7'
			},
			{
				src: '800.webp',
				alt: '8'
			},
			{
				src: '800.webp',
				alt: '9'
			},
			{
				src: '800.webp',
				alt: '10'
			},
			{
				src: '800.webp',
				alt: '11'
			}
		])
		//today: [{ title: 'event title' }]
	};
};
