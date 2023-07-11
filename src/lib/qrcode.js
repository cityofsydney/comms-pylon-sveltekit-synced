import QRCode from 'qrcode';

export async function addQRcode(resArray) {
	try {
		const newItems = await Promise.all(
			resArray.map(async (item) => {
				let whatsOnUrl = `https://whatson.cityofsydney.nsw.gov.au/events/${item.slug}?utm_medium=outdoor&utm_source=qms-touch&utm_campaign=whatson`;

				let code = await QRCode.toDataURL(whatsOnUrl, {
					errorCorrectionLevel: 'L',
					margin: 2,
					width: 400
				}); // perform some async operation on the item

				item.qrcode = code; // add a new property to the item
				return item;
			})
		);
		return newItems;
	} catch (error) {
		console.log(error);
	}
}
