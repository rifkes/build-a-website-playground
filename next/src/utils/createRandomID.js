const createRandomID = () => {
	const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:;-_+=()*&^%£';
	return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => allChars[byte % allChars.length]).join('');
}

export default createRandomID;