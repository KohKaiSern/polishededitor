import versions from '$data/versions.json';
import addresses from '$data/addresses.json';

export const buf2hex = (buffer) => {
	return Array.from(
		[...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0').toUpperCase())
	);
};

export const checkSaveVersion = (fileHex) => {
	const saveVersion = parseInt(fileHex[parseInt(addresses.sSaveVersion, 16) + 1], 16);
	if (saveVersion === parseInt(versions.save)) {
		return 'Save Validated!';
	}
	return `This save file has version ${saveVersion}. The current save version is ${versions.save}. Ensure that your game is on version ${versions.game}.`;
};
