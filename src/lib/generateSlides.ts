/**
 * Return an array with objects containing data of sample images.
 *
 * @param length - Optional. A number of slides.
 * @param sig    - Optional. The signature for getting a different image.
 *
 * @return An array with objects for sample images.
 */
export function generateSlides(length = 6, sig = 0): Array<{ src: string; alt: string }> {
	return Array.from({ length }).map((_, index) => {
		index = sig || index;

		return {
			src: `https://source.unsplash.com/random/600x600?sig=${index}`,
			alt: `Image ${index}`
		};
	});
}
