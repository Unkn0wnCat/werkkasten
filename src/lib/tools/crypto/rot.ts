type RotArgs = {
	input: string;
	offset: number;
	reverse?: boolean;
};

type RotResponse = {
	hasOutOfRange: boolean;
	output: string;
};

const rot = ({ input, offset, reverse }: RotArgs): RotResponse => {
	const rotInput = input.toUpperCase().split('');

	let actualOffset = offset;

	if (reverse) {
		actualOffset = -actualOffset;
	}

	let hasOutOfRange = false;
	const min = 65; // This is A
	const max = 90; // This is Z
	const range = max - min + 1; // The length of the alphabet

	const rotOut = rotInput.map((char) => {
		let charCode = char.charCodeAt(0);

		if (charCode > max || charCode < min) {
			hasOutOfRange = true;
			return char;
		}

		charCode += actualOffset;

		while (charCode > max) charCode -= range;
		while (charCode < min) charCode += range;

		return String.fromCharCode(charCode);
	});

	return {
		hasOutOfRange,
		output: rotOut.join('').toUpperCase()
	};
};

export default rot;
