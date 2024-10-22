export default function successful(data: string[]) {
	for (const dataKey of data) {
		if (dataKey.toLowerCase() != 'true') {
			return false
		}
	}
	return true
}
