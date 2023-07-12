import QRCode from 'qrcode';

  async function loopOverArray(array: Array) {
	for (const obj of array) {
	  obj.qrcode = await QRCode.toDataURL(`https://whatson.cityofsydney.nsw.gov.au/events/${obj.slug}?utm_medium=outdoor&utm_source=qms-touch&utm_campaign=whatson`, {
		errorCorrectionLevel: 'L',
		margin: 2,
		width: 400
	});
	}
	return array;
  }

export async function addQRcode(array) {

	let loop = await loopOverArray(array.data)
	//console.log(loop)

	return loop
}
